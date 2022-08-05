# JWT Decoding inside a CF Worker Demo

This code checks for a valid, signed JWT from the query parameter `gift`. It also validates that the JWT's `id` claim matches the requested `id` query parameter.

Compliments the [JWT Express demo](https://github.com/cwood-strib/jwt-demo).


## Benchmarks

```
npm run bench
```

Checking for a gift on every request makes this a performance-critical code path. Benchmarks to test approaches exist in the `bench` directory.