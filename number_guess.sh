#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

GAME () {
  SECRET_NUMBER=$((1 + $RANDOM % 1000))
  echo -e "\nGuess the secret number between 1 and 1000:"
  read GUESS
  COUNT=1
  while [[ $GUESS -ne $SECRET_NUMBER ]]
  do
    if [[ $GUESS =~ ^[0-9]+$ ]]
    then
      if [[ $GUESS -lt $SECRET_NUMBER ]]
      then
        echo -e "\nIt's higher than that, guess again:"
        read GUESS
      elif [[ $GUESS -gt $SECRET_NUMBER ]]
      then
        echo -e "\nIt's lower than that, guess again:"
        read GUESS
      fi
      COUNT=$((COUNT+1))
    else
      echo -e "\nThat is not an integer, guess again:"
      read GUESS
    fi
  done
  echo -e "\nYou guessed it in $COUNT tries. The secret number was $SECRET_NUMBER. Nice job!"
}

echo -e "Enter your username:"
read USERNAME

USER_INFO=$($PSQL "SELECT games_played, best_game FROM users WHERE name='$USERNAME'")
if [[ -z $USER_INFO ]]
then
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  GAME
  INSERT_NEW_USER=$($PSQL "INSERT INTO users(name, games_played, best_game) VALUES ('$USERNAME', 1, $COUNT)")
else
  GAMES_PLAYED=$(echo $USER_INFO | sed -r 's/([0-9]+).*/\1/')
  BEST_GAME=$(echo $USER_INFO | sed -r 's/^([0-9]+)\|([0-9]+)$/\2/')
  echo -e "\nWelcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  GAME
  if [[ $COUNT -lt $BEST_GAME ]]
  then
    BEST_GAME=$((COUNT))
  fi
  INSERT_USER_INFO=$($PSQL "UPDATE users SET games_played=$((GAMES_PLAYED+1)), best_game=$BEST_GAME WHERE name='$USERNAME'")
fi
