Incoming parameters:
JSON object with a list of data (data), and a condition for processing (condition):
{"data": [{"user": "mike@mail.com", "rating": 20, "disabled": false},
{"user": "greg@mail.com", "rating": 14, "disabled": false},
{"user": "john@mail.com", "rating": 25, "disabled": true}],
"condition": {"exclude": [{"disabled": true}], "sort_by": ["rating"]}}
Output:
JSON object with data received after applying the processing condition (result):
{"result": [{"user": "greg@mail.com", "rating": 14, "disabled": false},
{"user": "mike@mail.com", "rating": 20, "disabled": false}]}

– The logic is universal for transferred objects of any structure.
– Rule processors are divided into files, which will greatly facilitate the work with the code when their number increases.
– Implemented the ability to filter by several rules at the same time. For example: {"exclude": [{"age": 27}], "include": [{"gender":"male"}]}.
– Implemented the ability to filter by several conditions within one rule at the same time. For example: {"include": [{"name": "John"},{"email":"john1@mail.com"}].
– Added the ability to sort by multiple fields at the same time. If two identical values ​​occur, you can evaluate other object properties for that pair.
