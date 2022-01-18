#pragma once
#include<iostream>
using namespace std;

template<class T>
class list
{
public:
	typedef typename T value_type;
	typedef typename int size_type;
private:
	class Node
	{
	public:
		Node* next;
		value_type data;
		Node(T data = T(), Node* next = nullptr) : data(data), next(next) {}
	};
	Node* head;
	size_type N;
public:
	class iterator {
	public:
		typedef typename Node* pointer;
		iterator(pointer p) : p(p) {}
		void operator++(int) { return iterator(p = p->next); }
		bool operator != (iterator i) { return p != i.p; }
		value_type& operator*() { return p->data;; }
	private:
		pointer p;
	};

	iterator begin() { return iterator(head); }
	iterator end() { return iterator(NULL); }

	list() : head(NULL), N(0) {
		/*cout << "Вызвался конструктор\t\t\t" << this << "\n"; */
	}
	list(Node* head, size_type size) : head(head), N(size) {}
	list(const list& other) : head(NULL)
	{
		/*cout << "Вызвался конструктор копирования \t" << this << "\n";*/
		Node* tmp = other.head;
		while (tmp != nullptr)
		{
			this->push_back(tmp->data);
			tmp = tmp->next;
		}
	}
	~list()
	{
		/*cout << "Вызвался деструктор\t\t\t" << this << "\n";*/
		while (N)
		{
			pop_front();
		}
	}

	void pop_back();
	void pop_front();
	void push_back(T data);
	void push_front(T data);
	void insert(T data, int index);
	void RemoveAt(int index);
	void clear();
	void display();
	value_type& operator[](int index);

	list& operator= (const list& other)
	{

		this->head = nullptr;
		Node* tmp = other.head;
		while (tmp != nullptr)
		{
			this->push_back(tmp->data);
			tmp = tmp->next;
		}
		return *this;
	}
	size_type size() { return N; }
	bool empty()
	{
		if (head == nullptr && N == 0)
			return true;
		else
			return false;
	}
};

template <class T>
struct iter_traits {
	typedef typename T::value_type value_type;
};

template <class T>
struct iter_traits <T*> {
	typedef typename T value_type;
};

template<class T>
void list<T>::pop_back()
{
	RemoveAt(N - 1);
}

template<class T>
void list<T>::pop_front()
{
	if (head == nullptr)
	{
		cout << ":(\n";
	}
	else {
		Node* tmp = head;
		head = head->next;
		tmp->next = NULL;
		delete tmp;
		N--;
	}
}

template<class T>
void list<T>::push_back(T data)
{
	if (head == nullptr)
	{
		head = new Node(data);
	}
	else
	{
		Node* current = this->head;
		while (current->next != nullptr)
			current = current->next;
		try { current->next = new Node(data); }
		catch (bad_alloc e) { cout << e.what() << endl; return; }
	}
	N++;
}

template<class T>
void list<T>::push_front(T data)
{
	try { head = new Node(data, head); }
	catch (bad_alloc e) { cout << e.what() << endl; return; }
	N++;
}

template<class T>
void list<T>::insert(T data, int index)
{
	if (index == 0)
		push_front(data);
	else
	{
		Node* previous = this->head;
		for (int i = 0; i < index - 1; i++)
			previous = previous->next;
		Node* newnode = new Node(data, previous->next);
		N++;
	}
}

template<class T>
void list<T>::RemoveAt(int index)
{
	if (index == 0)
		pop_front();
	else
	{
		Node* previous = this->head;
		for (int i = 0; i < index - 1; i++)
			previous = previous->next;
		Node* todelete = previous->next;
		previous->next = todelete->next;

		delete todelete;
		N--;
	}
}

template<class T>
void list<T>::clear()
{
	while (N)
		pop_front();
}

template<class T>
void list<T>::display()
{
	if (head == nullptr)
		cout << "stack underflow\n";
	else
	{
		for (int i = 0; i < N; i++)
			cout << this->operator[](i) << endl;
	}
}

template<class T>
T& list<T>::operator[](int index)
{
	int counter = 0;
	Node* current = this->head;
	while (current != nullptr)
	{
		if (counter == index)
			return current->data;
		current = current->next;
		counter++;
	}
}