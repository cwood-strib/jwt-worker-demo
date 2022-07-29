# JWT Decoding inside a CF Worker Demo

This code checks for a valid, signed JWT from the query parameter `gift`. It also validates that the JWT's `id` claim matches the requested `id` query parameter.

Compliments the [JWT Express demo](https://github.com/cwood-strib/jwt-demo).