# BlockShop - Testing Guide

## Quick Start

The app is running at: **http://localhost:3000**

---

## Test Scenario 1: Login Validation ✅

### Test Invalid Login
1. Go to http://localhost:3000/login
2. Try logging in with:
   - Email: `random@test.com`
   - Password: `anything`
3. **Expected:** Error message "Invalid email or password"

### Test Valid Login (Buyer)
1. Use credentials:
   - Email: `buyer1@test.com`
   - Password: `buy01`
2. **Expected:** Successfully logs in as buyer
3. **Expected:** Redirected to home page with products

### Test Valid Login (Seller)
1. Logout and go back to login
2. Switch to "Seller" tab
3. Use credentials:
   - Email: `Seller1@test.com`
   - Password: `user1`
4. **Expected:** Successfully logs in as seller
5. **Expected:** Redirected to seller dashboard

---

## Test Scenario 2: Signup with Password Validation ✅

### Test Password Mismatch
1. Go to http://localhost:3000/signup
2. Fill in:
   - Name: `Test User`
   - Email: `newuser@test.com`
   - Password: `password123`
   - Confirm Password: `password456` (different!)
3. Click "Create Account"
4. **Expected:** Error "Passwords do not match"

### Test Successful Signup
1. Fill in:
   - Name: `Test Buyer`
   - Email: `testbuyer@test.com`
   - Password: `test123`
   - Confirm Password: `test123` (matching!)
   - Role: Select "Buy Products"
2. Click "Create Account"
3. **Expected:** Account created successfully
4. **Expected:** Logged in and redirected to home

### Test Duplicate Email
1. Logout
2. Try signing up again with `testbuyer@test.com`
3. **Expected:** Error "An account with this email already exists"

---

## Test Scenario 3: Complete Order Flow with Mark as Delivered ✅

### Step 1: Buyer Places Order
1. Login as buyer: `buyer1@test.com` / `buy01`
2. Browse products on home page
3. Click on any product (e.g., "MacBook Pro")
4. Click "Add to Cart" or "Buy Now"
5. Fill in shipping address
6. Complete checkout
7. **Expected:** Order created with status "Pending"

### Step 2: Seller Accepts Order
1. Logout
2. Login as seller: `Seller1@test.com` / `user1`
3. Go to Dashboard
4. **Expected:** See the new order in "Pending Orders"
5. Click "Accept Order"
6. **Expected:** Order status changes to "Accepted"

### Step 3: Seller Ships Order
1. Go to "Manage Orders" from seller dashboard
2. Find the accepted order
3. Click "Mark as Shipped"
4. Enter tracking ID (e.g., `TRACK-12345`)
5. Confirm shipment
6. **Expected:** Order status changes to "Shipped"
7. **Expected:** Tracking ID is saved

### Step 4: Buyer Marks as Delivered
1. Logout
2. Login as buyer: `buyer1@test.com` / `buy01`
3. Go to "My Orders"
4. Find the shipped order
5. **Expected:** See "Mark as Delivered" button (green button)
6. Click "Mark as Delivered"
7. Read confirmation dialog
8. Click "OK" to confirm
9. **Expected:** Order status changes to "Delivered"
10. **Expected:** Success notification appears
11. **Expected:** "Leave Review" button now appears

---

## Test Scenario 4: Review Restriction ✅

### Test Review Without Delivery
1. Login as buyer: `buyer1@test.com` / `buy01`
2. Go to any product page
3. Try to leave a review
4. **Expected:** Error "You can only review products you have received"

### Test Review After Delivery
1. Complete the full order flow (Steps 1-4 above)
2. After marking order as delivered
3. Go to the product page
4. Click "Leave Review"
5. Fill in rating and comment
6. Submit review
7. **Expected:** Review submitted successfully
8. **Expected:** Review appears on product page

---

## Test Scenario 5: Order Status Tracking

### Check All Order Statuses
1. Login as buyer
2. Go to "My Orders"
3. Use filter buttons to view:
   - All Orders
   - Pending (waiting for seller acceptance)
   - Accepted (seller accepted, waiting for payment)
   - Paid (payment completed, ready to ship)
   - Shipped (on the way, can mark as delivered)
   - Delivered (received, can leave review)
   - Cancelled (buyer cancelled)

### Test Order Cancellation
1. Place a new order
2. While status is "Pending"
3. Click "Cancel Order"
4. Confirm cancellation
5. **Expected:** Order status changes to "Cancelled"
6. **Expected:** Cannot cancel orders that are not pending

---

## Visual Verification

### Product Display
- Products show name, price, image
- Blockchain verified badge appears
- Discount badges show correctly
- Add to cart button works

### Order Cards
- Show product image
- Display order ID
- Show status badge with correct color
- Display amount in ETH
- Show shipping address
- Display tracking ID (when shipped)

### Buttons Visibility
- "Cancel Order" - Only on pending orders
- "Mark as Delivered" - Only on shipped orders
- "Leave Review" - Only on delivered orders

---

## Expected Behavior Summary

| User Action | Expected Result |
|------------|----------------|
| Login with wrong credentials | Error message |
| Login with correct credentials | Success, redirect to dashboard |
| Signup with mismatched passwords | Error message |
| Signup with existing email | Error message |
| Signup with valid data | Account created, logged in |
| Place order | Order created with "Pending" status |
| Seller accepts order | Status → "Accepted" |
| Seller ships order | Status → "Shipped", tracking ID saved |
| Buyer marks as delivered | Status → "Delivered" |
| Try to review before delivery | Error message |
| Review after delivery | Review submitted successfully |
| Cancel pending order | Order cancelled |
| Try to cancel shipped order | Button not visible |

---

## Troubleshooting

### If login doesn't work:
1. Open browser console (F12)
2. Go to Application → Local Storage
3. Check `w3mart_users` - should have default users
4. If empty, refresh the page (default users auto-initialize)

### If orders don't appear:
1. Check `w3mart_orders` in localStorage
2. Verify buyer_email matches logged-in user email
3. Try refreshing the orders page

### If "Mark as Delivered" doesn't appear:
1. Verify order status is exactly "shipped" (not "Shipped")
2. Check that you're logged in as the buyer (not seller)
3. Refresh the page

---

## Demo Credentials

### Buyers
- `buyer1@test.com` / `buy01`
- `buyer2@test.com` / `buyer123`

### Sellers
- `Seller1@test.com` / `user1`
- `seller2@test.com` / `seller123`

---

## Success Criteria

✅ All 5 test scenarios pass
✅ No console errors
✅ Smooth user experience
✅ Proper error messages
✅ Status updates work correctly
✅ Reviews only after delivery
✅ Login validates credentials

---

**Happy Testing! 🎉**
