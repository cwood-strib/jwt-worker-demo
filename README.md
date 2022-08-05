# JWT Decoding inside a CF Worker Demo

This code does a few things: 
- Checks for a valid, signed JWT from the query parameter `gift` 
- Validates that the JWT's `id` claim matches the requested `id` query parameter
- Inserts a special meta tag into the requested page when the previous checks pass

Compliments the [JWT Express demo](https://github.com/cwood-strib/jwt-demo).

## Benchmarks

```
npm run bench
```

Checking for a gift on every request makes this a performance-critical code path. Benchmarks to test approaches exist in the `bench` directory.
