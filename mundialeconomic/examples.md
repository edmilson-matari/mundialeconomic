const timer = setTimeout(() => {
setStore({
id: Number(id),
owner: "Jorge",
email: "jondoe@gmail.com",
phone: "34343434",
name: "Luxe Fashion Boutique",
logo: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
banner:
"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
category: "Women's Fashion",
rating: 4.8,
totalReviews: 842,
totalProducts: 342,
joinedDate: "March 2023",
location: "Los Angeles, USA",
description:
"Premium fashion for the modern woman. Curated collections of dresses, bags, shoes & accessories from top designers.",
isVerified: true,
status: "active",
});

      setProducts([
        {
          id: 1,
          productName: "Leather Crossbody Bag",
          price: 89,
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
          store: {
            name: "Luxe Fashion Boutique",
            logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
            rating: 4.8,
          },
        },
        {
          id: 2,
          productName: "Wireless ANC Headphones",
          price: 199,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop",
          store: {
            name: "TechTrend Electronics",
            logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
            rating: 4.9,
          },
        },
        {
          id: 3,
          productName: "Minimalist White Sneakers",
          price: 119,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
          store: {
            name: "Urban Sneakers Co.",
            logo: "https://images.unsplash.com/photo-1605406575497-940d57b521f7?w=80&h=80&fit=crop",
            rating: 4.7,
          },
        },
        {
          id: 4,
          productName: "Vitamin C Glow Serum",
          price: 59,
          image:
            "https://images.unsplash.com/photo-1625772292130-c5af89e24ca5?w=800&h=1000&fit=crop",
          store: {
            name: "Glow Beauty Studio",
            logo: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f7b?w=80&h=80&fit=crop",
            rating: 4.9,
          },
        },
        {
          id: 5,
          productName: "Summer Linen Dress",
          price: 79,
          image:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
          store: {
            name: "Luxe Fashion Boutique",
            logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
            rating: 4.8,
          },
        },
        {
          id: 6,
          productName: "Smart Watch Pro",
          price: 299,
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=1000&fit=crop",
          store: {
            name: "TechTrend Electronics",
            logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
            rating: 4.9,
          },
        },
      ]);

      const deals = [

{
id: 1,
productName: "Leather Crossbody Bag",
price: 89,
image:
"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
store: {
name: "Luxe Fashion Boutique",
logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
rating: 4.8,
},
},
{
id: 2,
productName: "Wireless ANC Headphones",
price: 199,
image:
"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop",
store: {
name: "TechTrend Electronics",
logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
rating: 4.9,
},
},
{
id: 3,
productName: "Minimalist White Sneakers",
price: 119,
image:
"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
store: {
name: "Urban Sneakers Co.",
logo: "https://images.unsplash.com/photo-1605406575497-940d57b521f7?w=80&h=80&fit=crop",
rating: 4.7,
},
},
{
id: 4,
productName: "Vitamin C Glow Serum",
price: 59,
image:
"https://images-cdn.ubuy.co.in/68fb75366786fcc0770d7bff-professional-vitamin-c-face-serum-20.jpg",
store: {
name: "Glow Beauty Studio",
logo: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f7b?w=80&h=80&fit=crop",
rating: 4.9,
},
},
{
id: 5,
productName: "Summer Linen Dress",
price: 79,
image:
"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
store: {
name: "Luxe Fashion Boutique",
logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
rating: 4.8,
},
},
{
id: 6,
productName: "Smart Watch Pro",
price: 299,
image:
"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=1000&fit=crop",
store: {
name: "TechTrend Electronics",
logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
rating: 4.9,
},
},
];
