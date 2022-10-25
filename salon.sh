#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

MAIN() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  DISPLAY_SERVICES
  SELECT_SERVICE
}

DISPLAY_SERVICES () {
  # get services
  SERVICES=$($PSQL "SELECT * FROM services")
  # display services
  echo "$SERVICES" | while read SERVICE_ID BAR SERVICE
  do
    echo "$SERVICE_ID) $SERVICE"
  done
}

SELECT_SERVICE () {
  # ask for selected service
  read SERVICE_ID_SELECTED
  # if input is not a number
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    # send to main menu
    MAIN "That is not a valid bike number."
    else
    # get service availability
    SERVICE_AVAILABILITY=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
    
    # if not available
    if [[ -z $SERVICE_AVAILABILITY ]]
    then
      # send to main menu
      MAIN "I could not find that service. What would you like today?"
    else
      # get selected service name
      SERVICE_SELECTED=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
      SERVICE_SELECTED_FORMATTED=$(echo $SERVICE_SELECTED | sed -r 's/^ *| *$//g')

      # get customer info
      echo -e "\nWhat's your phone number?"
      read CUSTOMER_PHONE

      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")

      # if customer doesn't exist
      if [[ -z $CUSTOMER_NAME ]]
      then
        # get new customer name
        echo -e "\nI don't have a record for that phone number, what's your name?"
        read CUSTOMER_NAME

        # insert new customer
        INSERT_CUSTOMER=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')") 
      fi

      CUSTOMER_NAME_FORMATTED=$(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')

      # get service time
      echo -e "\nWhat time would you like your $SERVICE_SELECTED_FORMATTED, $CUSTOMER_NAME_FORMATTED?"
      read SERVICE_TIME

      # get customer id
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")

      #insert new appointment
      INSERT_APPOINTMENT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES ('$CUSTOMER_ID', '$SERVICE_ID_SELECTED', '$SERVICE_TIME')")
      echo -e "\nI have put you down for a $SERVICE_SELECTED_FORMATTED at $SERVICE_TIME, $CUSTOMER_NAME_FORMATTED."
    fi
  fi
}

echo -e "\n~~~~ My Salon ~~~~\n"
echo -e "Welcome to My Salon, how can I help you?\n"
MAIN
