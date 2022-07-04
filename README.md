Incoming parameters:
An object in JSON format containing the distance specified for conversion (distance) from
value (value) and scale (unit), as well as the designation of the unit for the scale to which
must be converted (convert_to). For example:
{"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}

Output:
An object in JSON format containing the received distance value, rounded up to
hundredths, as well as the designation of the corresponding unit of measure, for example:
{"unit": "ft", "value": 1.64}

It is also possible to expand the list of supported units by setting conversion rules via JSON file.
