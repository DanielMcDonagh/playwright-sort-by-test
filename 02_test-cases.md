# Test Cases

## Tech Test Prompt 2

Write test cases to cover additional scenarios you can imagine


## Refined Acceptance Criteria – Test Cases

### TC1 – Default sort applied on initial visit
**Precondition:** User navigates to product list as a guest or authenticated user  
**Steps:**
1. Navigate to the product listing page  
2. Observe initial sort state  
**Expected:** Products are sorted using the Default option (mapped to item ID or backend logic)

### TC2 – “Sort By” dropdown contains correct values
**Steps:**
1. Navigate to the product listing page  
2. Click to open the Sort By dropdown  
**Expected:** Dropdown lists the following values in order:
- Default
- Product Name
- Price
- New Arrivals

### TC3 – Selecting a sort option updates product order
**Steps:**
1. Open the Sort By dropdown  
2. Select “Product Name”  
**Expected:** Products are reordered alphabetically (A–Z)

### TC4 – Toggle arrow reverses sort order
**Steps:**
1. Select “Product Name” in the dropdown  
2. Click the sort direction toggle  
**Expected:** Products are reordered Z–A (descending)

### TC5 – Reset to “Default” restores original order
**Steps:**
1. Select any sort option and toggle direction  
2. Reopen Sort By dropdown  
3. Select “Default”  
**Expected:** Product list returns to original ordering by item ID

### TC6 – Current sort and direction are visible in the UI
**Steps:**
1. Apply a sort (e.g. Price, descending)  
2. Observe dropdown and toggle  
**Expected:** Sort label and arrow icon indicate selected type and direction

### TC7 – Sort does not trigger full page reload
**Steps:**
1. Open dev tools (preserve log enabled)  
2. Change sort option  
**Expected:** Product grid updates without a full page reload

## Provisional Acceptance Criteria – Test Cases

### TC8 – All roles can access sort controls
**Steps:**
1. Visit product list as a guest  
2. Login and return to product list  
**Expected:** Sort functionality remains consistent between user roles

### TC9 – Sorting handles large data sets
**Steps:**
1. Visit product list with 100+ products  
2. Apply sort: “Price”  
**Expected:** Sort completes with no visual lag or functional error

### TC10 – Keyboard navigation for sort controls
**Steps:**
1. Navigate to sort dropdown using keyboard  
2. Use arrow keys to select sort value  
3. Press Enter to apply  
**Expected:** Sort activates; focus and accessibility states are preserved

### TC11 – Sort state reflected in URL
**Steps:**
1. Apply sort: “Product Name”, descending  
2. Observe browser URL  
3. Refresh page  
**Expected:** Sort state is encoded in query parameters and restored on refresh

### TC12 – Deep linking into sorted view
**Steps:**
1. Open URL preloaded with query parameters  
**Expected:** Product list reflects provided sort type and direction

## Exploratory Scenarios and Edge Cases

### TCX1 – Changing sort after applying multiple filters
**Steps:**
1. Apply multiple filters (e.g. category and price range)  
2. Select “New Arrivals”  
3. Change to “Price”  
**Expected:** Filters remain applied; sort applies to filtered result set

### TCX2 – Sorting works with pagination
**Steps:**
1. Navigate to page 1 of product results  
2. Apply sort: “Product Name”
3. Navigate to page 2 of product results  
**Expected:** Products reorder and stays applied after navigation.

### TCX3 – Selecting the same sort option multiple times
**Steps:**
1. Select “Price”  
2. Toggle direction twice  
3. Re-select “Price”  
**Expected:** Product list remains stable; no redundant state change

### TCX4 – Sorting with 2 or fewer items
**Steps:**
1. Navigate to a category with two items  
2. Apply sort  
**Expected:** No change in order, no UI or logic errors

### TCX5 – Items with duplicate values
**Steps:**
1. View products with same price  
2. Apply “Price” sort  
**Expected:** Consistent fallback ordering applied (e.g. ID)

### TCX6 – Sorting under limited connectivity
**Steps:**
1. Go offline or simulate slow network  
2. Attempt to sort  
**Expected:** UI fallback or graceful error shown depending on client/server logic

### TCX7 – Refresh and return mid-sort
**Steps:**
1. Apply sort  
2. Refresh page, navigate away and back  
**Expected:** Sort resets or persists based on feature requirements

### TCX8 – Sort combined with search term
**Steps:**
1. Enter search input  
2. Apply a sort  
**Expected:** Sort targets search-filtered result set

## Load and Performance – Test Cases

### TCX9 – Sort responsiveness with large dataset
**Steps:**
1. Populate list with 500+ items  
2. Apply each sort and toggle  
**Expected:** Grid updates in under 1.5s; no visual regressions

### TCX10 – Rapid sort toggle interactions
**Steps:**
1. Apply sort  
2. Toggle direction repeatedly  
**Expected:** Sort state updates correctly; system remains stable

### TCX11 – Concurrent users applying sort
**Steps:**
1. Simulate 50+ concurrent sort operations  
**Expected:** No server/API degradation; sort remains stable under load

### TCX12 – Cold start followed by sort
**Steps:**
1. Clear cache, open product list  
2. Immediately apply a sort  
**Expected:** Sort applies smoothly; first paint and response time meet performance budget

## Test Coverage Matrix

| Test Case ID | Description                                      | Related AC / Provisional AC      | Automatable | Automation Method           |
|--------------|--------------------------------------------------|----------------------------------|-------------|-----------------------------|
| TC1          | Default sort on first visit                      | Refined AC 1                     | Yes         | Playwright E2E              |
| TC2          | Sort dropdown shows five values                  | Refined AC 2                     | Yes         | Playwright E2E              |
| TC3          | Selecting a sort option changes order            | Refined AC 2                     | Yes         | Playwright E2E              |
| TC4          | Toggle reverses sort direction                   | Refined AC 3                     | Yes         | Playwright E2E              |
| TC5          | Reset to "Default" restores base order           | Refined AC 2                     | Yes         | Playwright E2E              |
| TC6          | Sort state visible in UI                         | Refined AC 3                     | Yes         | Playwright E2E              |
| TC7          | Sort happens without full reload                 | Additional Consideration         | Yes         | Playwright E2E              |
| TC8          | Guest vs. logged-in users see same sort          | Provisional AC 1                 | Yes         | Playwright E2E              |
| TC9          | Large dataset sorting responsiveness             | Provisional AC 2                 | Yes         | Playwright E2E              |
| TC10         | Keyboard navigation of sort controls             | Provisional AC 3                 | Yes         | Playwright E2E + a11y tools |
| TC11         | Sort state reflected in URL                      | Provisional AC 4                 | Yes         | Playwright E2E              |
| TC12         | Deep linking to sorted views                     | Provisional AC 4                 | Yes         | Playwright E2E              |
| TCX1         | Sort respects active filters                     | Exploratory                      | Yes         | Playwright E2E              |
| TCX2         | Sort works with pagination                       | Exploratory                      | Yes         | Playwright E2E              |
| TCX3         | Redundant sort input has no side effects         | Exploratory                      | Yes         | Playwright E2E              |
| TCX4         | Sorting with ≤2 items                            | Exploratory                      | Yes         | Playwright E2E              |
| TCX5         | Duplicate sort values handled consistently       | Exploratory                      | Yes         | Playwright E2E              |
| TCX6         | Sort under poor or no network                    | Exploratory                      | Partially   | Playwright + Mocked APIs    |
| TCX7         | Sort persistence on refresh/navigation           | Exploratory / Provisional AC 4   | Yes         | Playwright E2E              |
| TCX8         | Sort while using search                          | Exploratory                      | Yes         | Playwright E2E              |
| TCX9         | Sort responsiveness with large datasets          | Load/Performance                 | Partially   | Playwright + profiling      |
| TCX10        | Rapid sort toggle stability                      | Load/Performance                 | Yes         | Playwright E2E              |
| TCX11        | API stability under concurrent requests          | Load/Performance                 | Yes         | API Tool (Locust/K6/Python) |
| TCX12        | Cold start with immediate sorting                | Load/Performance                 | Partially   | Playwright + Lighthouse     |

## Summary of Test Coverage

| Category                          | Total Criteria | Criteria with Coverage | % Coverage |
|----------------------------------|----------------|-------------------------|------------|
| Refined Acceptance Criteria      | 3              | 3                       | 100%       |
| Provisional Acceptance Criteria  | 4              | 4                       | 100%       |
| Additional Considerations        | N/A            | N/A                     | -          |

## Next Page
- [03 – Testing Strategy](03_testing-strategy.md)
- [03b – Testing Strategy Summary](03b_testing-strategy-summary.md)