#pragma once
//#define STL
#ifndef STL
#include "MyList.h"
#else
#include <iostream>
using namespace std;
#include<list>
#endif


template <class T, class C = list<T>> class stack {
	C c;
public:
	typedef typename C::value_type value_type;
	typedef typename C::size_type size_type;
	explicit stack(const C& a = C()) : c(a) {}

	value_type& top() { return *c.begin(); }

	size_type size() { return c.size(); }
	bool empty() { return c.empty(); }

	void push(const value_type& x) { c.push_front(x); }
	void pop() {
		if (c.empty())
			cout << "Stack Underflow\n";
		else
			c.pop_front();
	}

	stack& operator= (const stack& other) {
		this->c = other.c;
		return *this;
	}
};