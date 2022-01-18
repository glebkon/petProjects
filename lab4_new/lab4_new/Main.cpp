#include <iostream>
#include <fstream>
using namespace std;
//#define STL
#ifndef STL
#include "MyQueue.h"
#else
#include <queue>
#endif

void menu()
{
	cout << "\t\tМеню" << endl;
	cout << "1. Добавить элемент в очередь" << endl;
	cout << "2. Добавить несколько элементов в очередь" << endl;
	cout << "3. Удалить элемент из очереди" << endl;
	cout << "4. Показать верхний элемент" << endl;
	cout << "5. Показать нижний элемент" << endl;
	cout << "6. Показать все элементы очереди" << endl;
	cout << "7. Удалить все элементы из очереди" << endl;
	cout << "0. Выход" << endl;
}

int main()
{
	setlocale(LC_ALL, "RUS");
	typedef typename queue<int>::value_type value_type;
	queue<value_type> q;
	queue<value_type> q2;
	ifstream fin;
	ofstream fout;
	int ch, count;
	value_type ne;
#ifndef STL
	cout << "Программа работает без подключения контейнеров библиотеки стандартных шаблонов" << endl;
#else
	cout << "Программа работает с подключением контейнеров библиотеки стандартных шаблонов" << endl;
#endif // STL

	menu();
	do
	{
		cout << "\nВведите номер задания: ";
		cin >> ch;
		switch (ch)
		{
		case 1:
			cout << "Введите новый элемент: ";
			cin >> ne;
			q.push(ne);
			break;
		case 2:
			cout << "Для добавления данных с файла введите 1, для добавления с консоли - 2\n";
			cin >> ch;
			if (ch == 1)
			{
				string tname;
				cout << "Введите название текстового файла (с указанием формата): ";
				cin >> tname;
				fin.open(tname);
				if (fin.is_open())
				{
					fin >> count;
					for (int i = 0; i < count; i++)
					{
						fin >> ne;
						q.push(ne);
					}
				}
				else
					cout << "Ошибка открытия файла" << endl;
				fin.close();
			}
			else if (ch == 2) {
				cout << "Введите количество элементов: ";
				cin >> count;
				for (int i = 0; i < count; i++)
				{
					cin >> ne;
					q.push(ne);
				}
			}
			break;
		case 3:
			if (!q.empty())
			{
				ne = q.front();
				q.pop();
				cout << "Элемент " << ne << " удален из очереди" << endl;
			}
			else
				cout << "Очередь пуста" << endl;
			break;
		case 4:
			if (!q.empty())
			{
				cout << "Верхний элемент: " << q.front() << endl;
			}
			else
				cout << "Очередь пуста" << endl;
			break;
		case 5:
			if (!q.empty())
			{
				cout << "Нижний элемент: " << q.back() << endl;
			}
			else
				cout << "Очередь пуста" << endl;
			break;
		case 6:
			if (q.empty())
				cout << "Очередь пуста" << endl;
			else
			{
				cout << "Для вывода элементов в файл введите 1, для вывода на консоль - 2\n";
				cin >> ch;
				q2 = q;
				if (ch == 2)
				{
					cout << endl;
					while (!q2.empty())
					{
						cout << q2.front() << endl;
						q2.pop();
					}
				}
				else if (ch == 1)
				{
					string tname;
					cout << "Введите название файла: ";
					cin >> tname;
					fout.open(tname);
					if (fout.is_open())
					{
						while (!q2.empty())
						{
							fout << q2.front() << endl;
							q2.pop();
						}
					}
					else
						cout << "Ошибка открытия файла" << endl;
					fout.close();
				}
				else
					cout << "Ошибка! Повторите попытку ещё раз" << endl;
			}
			break;
		case 7:
			if (q.empty())
				cout << "Очередь пуста" << endl;
			else
			{
				while (!q.empty())
				{
					cout << "Элемент " << q.front() << " удален из очереди" << endl;
					q.pop();
				}
			}
			break;
		case 0:
			cout << "Завершение работы программы" << endl;
			break;
		default:
			cout << "Ошибка! Повторите попытку ещё раз" << endl;
			break;
		}
	} while (ch != 0);
	return 0;
}