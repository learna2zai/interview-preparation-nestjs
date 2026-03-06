## NestJS Request Lifecycle Order

### Full order summary

```bash

Incoming Request
    ↓
Middleware
    ↓
Guards
    ↓
Interceptors (before)
    ↓
Pipes
    ↓
Controller
    ↓
Interceptors (after)
    ↓
Exception Filters (if error thrown)
    ↓
Response

```

### Easy Way to Remember

Think:

`Middleware → Guards → Interceptors → Pipes → Controller → Interceptors → Exception Filters`

or 

`M → G → I → P → C → I → E`

### Mental Model

```
🌍 Incoming Request
   ↓
1️⃣ Middleware          (outside the building)
   ↓
2️⃣ Guards              (security check)
   ↓
3️⃣ Interceptors (in)   (wrap start)
   ↓
4️⃣ Pipes               (validate/transform input)
   ↓
5️⃣ Controller          (business logic)
   ↓
3️⃣ Interceptors (out)  (wrap end)
   ↓
6️⃣ Exception Filters   (if something failed)
   ↓
📤 Response

```

### 1️⃣ Guards Order

Execution order:

```
Global Guards
   ↓
Controller Guards
   ↓
Method Guards
```

**Example:**

```typescript
// global
app.useGlobalGuards(new GlobalGuard())

@Controller()
@UseGuards(ControllerGuard)
class UserController {

  @Get()
  @UseGuards(MethodGuard)
  getUsers() {}
}
```

### Interceptors Order (Very Important)

Interceptors work like nested wrappers.

Execution order:

```
Global (outermost)
  Controller
    Method (innermost)
      → Controller runs
    Method (after)
  Controller (after)
Global (after)

```

### Pipes Order

Pipes run in this order:

```
Global Pipes
   ↓
Controller Pipes
   ↓
Method Pipes
   ↓
Parameter Pipes (last)
```

### Middleware Order

Middleware runs:
```
Global middleware (in order registered)
   ↓
Module middleware (in order registered)
```

### Exception Filters Order

If an error occurs:

```
Method Filter
   ↓
Controller Filter
   ↓
Global Filter
```

Closest filter handles it first.

If not handled → bubbles upward.

### Easy Memory Trick

Think in terms of:

🏗 Structure Order:

`Middleware → Guards → Interceptors → Pipes → Controller`

🪆 Scope Order:

`Global → Controller → Method`

🔁 Interceptors:

`Wrap like nested layers (outer → inner → inner → outer)`

### Oder Becomes

```

1. Global Middleware
2. Module Middleware

3. Global Guards
4. Controller Guards
5. Method Guards

6. Global Interceptor (before)
7. Controller Interceptor (before)
8. Method Interceptor (before)

9. Global Pipes
10. Controller Pipes
11. Method Pipes
12. Parameter Pipes

13. Controller Method

14. Method Interceptor (after)
15. Controller Interceptor (after)
16. Global Interceptor (after)

17. Exception Filters (if error occurred)

```