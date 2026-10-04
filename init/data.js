const sampleListings = [
  {
    title: "Luxury Beach Villa",
    description:
      "A beautiful sea-facing villa with a private pool, spacious rooms, and a relaxing tropical atmosphere.",
    image:"https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60",
    price: 4500,
    location: "Candolim, Goa",
    country: "India",
},
{
    title: "Cozy Cottage in Lonavala",
    description:
      "A peaceful cottage surrounded by greenery, perfect for a relaxing weekend away from the city.",
    image:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Lonavala, Maharashtra",
    country: "India",
},

  {
    title: "Royal Heritage Haveli",
    description:
      "Experience traditional Rajasthani architecture and royal hospitality in this beautifully restored haveli.",
    image:"https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=60",
  
    price: 3500,
    location: "Jaipur, Rajasthan",
    country: "India",
},
  {
    title: "Backwater Retreat",
    description:
      "Relax beside the peaceful backwaters in this charming property surrounded by coconut trees and nature.",
    image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=60",
  
    price: 2800,
    location: "Alleppey, Kerala",
    country: "India",
},

  {
    title: "Snow Valley Cottage",
    description:
      "A warm wooden cottage offering breathtaking views of snow-covered mountains and peaceful valleys.",
    image:"https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=800&q=60",
  
    price: 3200,
    location: "Manali, Himachal Pradesh",
    country: "India",
},

  {
    title: "Sea View Apartment",
    description:
      "A modern apartment with stunning Arabian Sea views and easy access to popular beaches.",
    image:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60",
  
    price: 3800,
    location: "Varkala, Kerala",
    country: "India",
},

  {
    title: "Forest Escape Cabin",
    description:
      "A peaceful wooden cabin surrounded by dense forest, ideal for nature lovers and weekend getaways.",
    image:"https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
  
    price: 2500,
    location: "Coorg, Karnataka",
    country: "India",
},

  {
    title: "Lake View Retreat",
    description:
      "Wake up to beautiful lake views from this comfortable retreat with modern amenities and peaceful surroundings.",
    image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Udaipur, Rajasthan",
    country: "India",
},

  {
    title: "Mountain View Homestay",
    description:
      "A cozy homestay overlooking the Himalayas with comfortable rooms and a quiet atmosphere.",
    image:"https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60",
  
    price: 1800,
    location: "Kasol, Himachal Pradesh",
    country: "India",
},

  {
    title: "Portuguese Villa",
    description:
      "Stay in a charming Portuguese-style villa featuring colorful interiors, a garden, and traditional Goan architecture.",
    image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=60",
    price: 4200,
    location: "Assagao, Goa",
    country: "India",
},

  {
    title: "Luxury City Apartment",
    description:
      "A stylish modern apartment located close to restaurants, shopping areas, and major city attractions.",
    image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    price: 2600,
    location: "Mumbai, Maharashtra",
    country: "India",
},

  {
    title: "Riverside Wooden Cabin",
    description:
      "Enjoy a peaceful stay beside the river in this cozy wooden cabin surrounded by mountains.",
    image:"https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=60",
  
    price: 2400,
    location: "Rishikesh, Uttarakhand",
    country: "India",
},

  {
    title: "Desert Camp Experience",
    description:
      "Experience traditional desert living with comfortable tents, cultural performances, and beautiful sunset views.",
    image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=60",
  
    price: 2100,
    location: "Jaisalmer, Rajasthan",
    country: "India",
},

  {
    title: "Tea Estate Bungalow",
    description:
      "Stay in a peaceful bungalow surrounded by lush tea plantations and misty green hills.",
    image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
    price: 2700,
    location: "Munnar, Kerala",
    country: "India",
},

  {
    title: "Beachfront Bungalow",
    description:
      "A cozy beachfront bungalow where you can enjoy beautiful sunsets and direct access to the sea.",
    image:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    price: 3300,
    location: "Palolem, Goa",
    country: "India",
},

  {
    title: "Heritage Palace Stay",
    description:
      "Live like royalty in this elegant heritage property featuring traditional interiors and beautiful courtyards.",
    image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=60",
    price: 5500,
    location: "Jodhpur, Rajasthan",
    country: "India",
},
{
    title: "Modern Hill House",
    description:
      "A modern hill house with large windows, panoramic views, and a peaceful environment.",
    image:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
    price: 2900,
    location: "Mahabaleshwar, Maharashtra",
    country: "India",
},

  {
    title: "Rooftop Stay in Varanasi",
    description:
      "A comfortable stay near the ghats with a beautiful rooftop offering views of the historic city.",
    image:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Varanasi, Uttar Pradesh",
    country: "India",
},

  {
    title: "Himalayan Glass Cabin",
    description:
      "Enjoy panoramic mountain views from this unique glass cabin designed for a memorable mountain escape.",
    image:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
    price: 3600,
    location: "Shimla, Himachal Pradesh",
    country: "India",
},

  {
    title: "Tropical Garden Villa",
    description:
      "A spacious tropical villa surrounded by gardens with a private pool and relaxing outdoor spaces.",
    image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60",
    price: 4800,
    location: "Baga, Goa",
    country: "India",
},
{
    title: "Minimalist Studio",
    description:
      "A clean and modern studio apartment perfect for solo travelers or couples exploring the city.",
    image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    price: 1900,
    location: "Pune, Maharashtra",
    country: "India",
},

  {
    title: "Kerala Riverside Villa",
    description:
      "A peaceful riverside villa surrounded by tropical greenery, perfect for families and groups.",
    image:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=60",
    price: 3400,
    location: "Kumarakom, Kerala",
    country: "India",
},

  {
    title: "Valley View Cottage",
    description:
      "A cozy cottage overlooking a beautiful valley with comfortable interiors and a private balcony.",
    image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",    price: 2300,
    location: "Mussoorie, Uttarakhand",
    country: "India",
},

  {
    title: "Luxury Farmhouse",
    description:
      "A spacious farmhouse surrounded by greenery with a large garden, pool, and outdoor seating area.",
    image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Alibaug, Maharashtra",
    country: "India",
},

  {
    title: "Coastal Retreat",
    description:
      "A peaceful coastal home offering fresh sea air, comfortable rooms, and easy beach access.",
    image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    price: 3100,
    location: "Gokarna, Karnataka",
    country: "India",
},

  {
    title: "Old Delhi Haveli",
    description:
      "Experience the charm of Old Delhi in this traditional haveli located close to historic landmarks.",
    image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "New Delhi, Delhi",
    country: "India",
},

  {
    title: "Jungle Retreat",
    description:
      "A comfortable jungle retreat surrounded by wildlife and nature, perfect for adventure lovers.",
    image:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=60",
    price: 2900,
    location: "Jim Corbett, Uttarakhand",
    country: "India",
}
,
  {
    title: "Luxury Apartment with Skyline View",
    description:
      "A premium apartment with stunning skyline views, modern interiors, and excellent city connectivity.",
    image:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    price: 4300,
    location: "Bengaluru, Karnataka",
    country: "India",
},

  {
    title: "Peaceful Orchard Homestay",
    description:
      "Stay among apple orchards and mountains in this peaceful homestay offering a refreshing countryside experience.",
    image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    price: 1700,
    location: "Manali, Himachal Pradesh",
    country: "India",
},

  {
    title: "Luxury Desert Villa",
    description:
      "A luxurious desert-inspired property featuring traditional architecture, private outdoor space, and premium amenities.",
    image:"https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
    price: 5200,
    location: "Jaisalmer, Rajasthan",
    country: "India",
},

  {
    title: "Sunset Beach House",
    description:
      "Enjoy spectacular sunsets from this comfortable beach house with spacious interiors and outdoor seating.",
    image:"https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=60",
    price: 3700,
    location: "Morjim, Goa",
    country: "India",
}
];

module.exports = { data: sampleListings };