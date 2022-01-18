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
	cout << "\t\t����" << endl;
	cout << "1. �������� ������� � �������" << endl;
	cout << "2. �������� ��������� ��������� � �������" << endl;
	cout << "3. ������� ������� �� �������" << endl;
	cout << "4. �������� ������� �������" << endl;
	cout << "5. �������� ������ �������" << endl;
	cout << "6. �������� ��� �������� �������" << endl;
	cout << "7. ������� ��� �������� �� �������" << endl;
	cout << "0. �����" << endl;
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
	cout << "��������� �������� ��� ����������� ����������� ���������� ����������� ��������" << endl;
#else
	cout << "��������� �������� � ������������ ����������� ���������� ����������� ��������" << endl;
#endif // STL

	menu();
	do
	{
		cout << "\n������� ����� �������: ";
		cin >> ch;
		switch (ch)
		{
		case 1:
			cout << "������� ����� �������: ";
			cin >> ne;
			q.push(ne);
			break;
		case 2:
			cout << "��� ���������� ������ � ����� ������� 1, ��� ���������� � ������� - 2\n";
			cin >> ch;
			if (ch == 1)
			{
				string tname;
				cout << "������� �������� ���������� ����� (� ��������� �������): ";
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
					cout << "������ �������� �����" << endl;
				fin.close();
			}
			else if (ch == 2) {
				cout << "������� ���������� ���������: ";
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
				cout << "������� " << ne << " ������ �� �������" << endl;
			}
			else
				cout << "������� �����" << endl;
			break;
		case 4:
			if (!q.empty())
			{
				cout << "������� �������: " << q.front() << endl;
			}
			else
				cout << "������� �����" << endl;
			break;
		case 5:
			if (!q.empty())
			{
				cout << "������ �������: " << q.back() << endl;
			}
			else
				cout << "������� �����" << endl;
			break;
		case 6:
			if (q.empty())
				cout << "������� �����" << endl;
			else
			{
				cout << "��� ������ ��������� � ���� ������� 1, ��� ������ �� ������� - 2\n";
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
					cout << "������� �������� �����: ";
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
						cout << "������ �������� �����" << endl;
					fout.close();
				}
				else
					cout << "������! ��������� ������� ��� ���" << endl;
			}
			break;
		case 7:
			if (q.empty())
				cout << "������� �����" << endl;
			else
			{
				while (!q.empty())
				{
					cout << "������� " << q.front() << " ������ �� �������" << endl;
					q.pop();
				}
			}
			break;
		case 0:
			cout << "���������� ������ ���������" << endl;
			break;
		default:
			cout << "������! ��������� ������� ��� ���" << endl;
			break;
		}
	} while (ch != 0);
	return 0;
}