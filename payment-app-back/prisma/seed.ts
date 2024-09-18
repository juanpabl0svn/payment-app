import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProducts() {
    const products = [
        {
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 1093295,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            stock: 120,
        },
        {
            title: "Mens Casual Premium Slim Fit T-Shirts",
            price: 212223,
            description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            stock: 259,
        },
        {
            title: "Mens Cotton Jacket",
            price: 552199,
            description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            stock: 500,
        },
        {
            title: "Mens Casual Slim Fit",
            price: 112599,
            description: "The color could be slightly different between on the screen and in practice.",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
            stock: 41230,
        },
        {
            title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            price: 6923,
            description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
            category: "jewelery",
            image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
            stock: 400,
        },
    ];

    for (const product of products) {
        await prisma.products.create({
            data: product,
        });
    }

}

async function seedUsers() {
    const users = [
        {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
        },
        {
            name: "Jane Smith",
            email: "janesmith@example.com",
            password: "password456",
        },
        {
            name: "Alice Johnson",
            email: "alicejohnson@example.com",
            password: "password789",
        },
    ];

    for (const user of users) {
        await prisma.users.create({
            data: user,
        });
    }

}


async function main() {
    Promise.all([seedProducts(), seedUsers()]);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
