create table public."Customers"
(
    id          serial                   primary key,
    name        varchar(255)             not null,
    email       varchar(255)             not null unique,
    password    varchar(255)             not null,
    enabled     boolean default true,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);