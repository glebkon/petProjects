#pragma once
//#define STL
#ifndef STL
#include "MyStack.h" 
#else
#include <iostream>
using namespace std;
#include<stack>
#endif

template <class T, class S = stack<T>> class queue {
	S s1;
	S s2;
public:
	typedef typename S::value_type value_type;
	typedef typename S::size_type size_type;

	bool empty() {
		return s1.empty();
	}
	size_type size() {
		if (!s1.empty())
			return s1.size();
		else
			return 0;
	}

	void pop()
	{
		s1.pop();
	}

	void push(const value_type& x)
	{
		while (!s1.empty())
		{
			s2.push(s1.top());
			s1.pop();
		}
		s2.push(x);
		while (!s2.empty())
		{
			s1.push(s2.top());
			s2.pop();
		}
	}

	value_type& front()
	{
		return s1.top();
	}

	value_type& back()
	{
		value_type tmp;
		s2 = s1;
		while (!s2.empty())
		{
			if (s2.size() == 1)
				tmp = s2.top();
			s2.pop();
		}
		return tmp;
	}

	queue& operator= (const queue& other) {
		this->s1 = other.s1;
		this->s2 = other.s2;
		return *this;
	}
};