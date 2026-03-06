### Clean Architecture style NestJS structure

```
src/
│
├── database/
│   ├── database.module.ts
│   └── database.providers.ts
│
├── users/
│   ├── domain/
│   │   └── user.repository.interface.ts
│   │
│   ├── infrastructure/
│   │   └── user.repository.ts
│   │
│   ├── user.entity.ts
│   ├── user.service.ts
│   └── user.module.ts
│
└── app.module.ts
```
