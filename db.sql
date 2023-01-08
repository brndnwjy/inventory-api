CREATE DATABASE inventory;

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    fullname VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE category (
    category_id UUID PRIMARY KEY,
    category_title VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE product (
    product_id UUID PRIMARY KEY,
    category_id UUID REFERENCES category(category_id),
    product_title VARCHAR(64) NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 1,
    photo VARCHAR (128),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);
