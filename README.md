# jmeter-ecommerce-performance-test

# FakeStore API Performance Test (JMeter)

## Overview
This project is a JMeter test plan created to test the performance of the FakeStore API endpoints using multiple user actions like browsing products and managing a shopping cart.

## Steps I Did
I created a new Test Plan named **"FakeStore API Performance Test"**.
I added user-defined variables for **BASE_URL**, **THREADS**, **RAMP_TIME**, and **LOOP_COUNT**.
<img width="1514" height="847" alt="image" src="https://github.com/user-attachments/assets/b3f29148-3bc7-45a6-a61e-88ba0c170866" />
I configured an **HTTP Request Defaults** element to set the base URL and default parameters.
<img width="1518" height="850" alt="image" src="https://github.com/user-attachments/assets/c31ce41f-24ab-40d0-814a-b80f2c554a5e" />
I added an **HTTP Header Manager** to include headers like `Content-Type` and `Accept`.
<img width="1515" height="841" alt="image" src="https://github.com/user-attachments/assets/4962a068-1845-462b-b81a-10d9ea3eff4c" />
I created a **Thread Group** named **"FakeStore API Performance Test"** to simulate concurrent users.
<img width="1510" height="848" alt="image" src="https://github.com/user-attachments/assets/8d6f8e32-26f4-4b37-8207-569aee963cb4" />
I added a **Controller** called **"Browse Products Flow"** to group product browsing requests.
<img width="1511" height="845" alt="image" src="https://github.com/user-attachments/assets/4612b072-a828-47fe-9252-228027249c06" />
I created an HTTP sampler **"1. Get All Users"** to fetch all users from the API.
<img width="1512" height="844" alt="image" src="https://github.com/user-attachments/assets/41ff1545-0614-4f21-a060-6eb78a345205" />
I added a **Response Assertion** to verify a **200 OK** response for user fetch.
<img width="1511" height="846" alt="image" src="https://github.com/user-attachments/assets/ec3aaeb6-5de9-4d3d-b332-21ade5bde805" />
I created an HTTP sampler **"2. Get All Products"** to retrieve product listings.
I added a **Response Assertion** to verify a **200 OK** response for product list.
<img width="1515" height="853" alt="image" src="https://github.com/user-attachments/assets/8d0dc033-a3e5-4ad2-b0a3-5fbcab3bdf3d" />
I created an HTTP sampler **"3. Get Product Details"** to check details of a specific product.
I added a **Response Assertion** to ensure a **200 OK** response for product details.
<img width="1504" height="850" alt="image" src="https://github.com/user-attachments/assets/db98c139-31dd-4944-a052-f53732470df8" />
I created another **Controller** called **"Shopping Cart Flow"** for cart-related actions.
<img width="1509" height="856" alt="image" src="https://github.com/user-attachments/assets/179ce3bc-2f9b-4153-9175-bed1cec56d38" />
I created an HTTP sampler **"4. Add to Cart"** to simulate adding items to the cart.
I added a **Response Assertion** to verify a **201 CREATED** response for cart addition.
<img width="1505" height="844" alt="image" src="https://github.com/user-attachments/assets/d44e9c6e-2f74-41ad-bdef-344b4625c196" />
I created an HTTP sampler **"5. Get Cart"** to fetch current cart contents.
I added a **Response Assertion** to ensure a **200 OK** response for cart retrieval.
I created an HTTP sampler **"6. Update Cart"** to modify items in the cart.
I added a **Response Assertion** to verify a **200 OK** response for cart update.
I created an HTTP sampler **"7. Delete Cart"** to test cart deletion.
I added a **Response Assertion** to confirm a **200 OK** response for cart deletion.
I ran the test and stored results in the **results/** folder.
<img width="1635" height="725" alt="image" src="https://github.com/user-attachments/assets/b6fbfe19-7551-4813-bb28-82e23dc06599" />
I generated the performance report (`index.html`) and linked assets (`style.css`, `script.js`) for visualization.
<img width="1885" height="812" alt="image" src="https://github.com/user-attachments/assets/a8ccd62d-b24f-441b-a983-5c7bc17d0b1b" />
<img width="1882" height="875" alt="image" src="https://github.com/user-attachments/assets/112ba9c1-c0e8-4fec-8035-768e946b8ac1" />

# Project Structure
.
│   ecommerce_test.jmx
│   products.csv
│   quantities.csv
│
└───results
    │   index.html
    │   results.jtl
    │
    └───content
            script.js
            style.css


