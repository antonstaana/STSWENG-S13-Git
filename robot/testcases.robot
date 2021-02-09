*** Settings ***
Documentation     Simple example using SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${LOGIN URL}      http://localhost:8000
${BROWSER}        Chrome

*** Test Cases ***
Invalid User Login
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    abc123@yahoo.com
    Login Password    abcd1234
    Login Submit
    Login Error
    [Teardown]    CLose Browser

Invalid Customer Register
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Click Signup
    Input email    1234
    Input First Name    Test
    Input Last Name    User
    Input password    abcd1234
    Input password2    abcd1234
    Input Address    Here    There
    Input Contact No    abcd
    Submit Credentials
    #Alert
    [Teardown]    Close Browser

Invalid Customer Register Long Input
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Click Signup
    Input email    abcd4321@gmail.com
    Input First Name    AaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    Input Last Name    BaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    Input password    1234asdf
    Input password2    1234asdf
    Input Address    Here    There
    Input Contact No    09123654987
    Submit Credentials
    [Teardown]    Close Browser

Invalid Customer Register No Input
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Click Signup
    Submit Credentials
    Error Message
    [Teardown]    Close Browser

Valid Customer Register
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Click Signup
    Input email    abc123@yahoo.com
    Input First Name    Test
    Input Last Name    Test
    Input password    abcd1234
    Input password2    abcd1234
    Input Address    Here    There
    Input Contact No    09123456789
    Submit Credentials
    Customer Page Check
    [Teardown]    Close Browser

Valid Register Restaurant
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Click Signup
    Click Restaurant
    Restaurant Email    qwerty321@gmail.com
    Restaurant Display Name    Siomai Rice 69
    Restaurant Category    Chinese Restaurant
    Restaurant Street Address    11 Street HighWay Milkyway
    Restaurant City    Manila
    Restaurant Contact No    09123465789
    Restaurant Times    0900AM    0700PM
    Restaurant Password1    qwerasdf
    Restaurant Password2    qwerasdf
    Submit Restaurant signup
    Restaurant Page Check    Siomai Rice 69
    [Teardown]    Close Browser

Valid User Login
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    abc123@yahoo.com
    Login Password    abcd1234
    Login Submit
    Customer Page Check
    [Teardown]    CLose Browser

Valid Restaurant Login
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    qwerty321@gmail.com
    Login Password    qwerasdf
    Login Submit
    Restaurant Page Check    Siomai Rice 69
    [Teardown]    Close Browser

Edit Customer Profile
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    abc123@yahoo.com
    Login Password    abcd1234
    Login Submit
    Click User Edit
    Edit User Name    Testing
    Edit User Last Name    Script
    Edit User Street    58 Broad Way Street
    Edit User City    Manila
    Edit User Number    091234567896
    Save User Edit
    Element Should Be Visible    //*[@id="customer-profile"]/div[1]/div/h1
    [Teardown]    Close Browser

Valid Customer Register 2
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Click Signup
    Input email    TestEmail123@yahoo.com
    Input First Name    Test
    Input Last Name    Test
    Input password    Test123456
    Input password2    Test123456
    Input Address    Here    There
    Input Contact No    09123456789
    Submit Credentials
    Customer Page Check
    [Teardown]    Close Browser

Edit Customer Password
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    TestEmail123@yahoo.com
    Login Password    Test123456
    Login Submit
    Click User Edit
    Click New Password
    Enter Customer Passwords    Test123456    123456Test
    Element Should Be Visible    //*[@id="customer-profile"]/div[1]/div/h1
    [Teardown]

Valid Register Restaurant 2
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Click Signup
    Click Restaurant
    Restaurant Email    Pokemon@yahoo.com
    Restaurant Display Name    Chicken Spicy Pokemon
    Restaurant Category    FastFood
    Restaurant Street Address    First Street Main Street
    Restaurant City    Manila
    Restaurant Contact No    09123454321
    Restaurant Times    0900AM    0700PM
    Restaurant Password1    Pokemon123
    Restaurant Password2    Pokemon123
    Submit Restaurant signup
    Restaurant Page Check    Chicken Spicy Pokemon
    [Teardown]    Close Browser

Edit Restaurant Profile
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    Pokemon@yahoo.com
    Login Password    Pokemon123
    Login Submit
    Click Restaurant Edit
    Edit Restaurant Name    Strawberry Shortcake Blue berry pie
    Edit Restaurant Desc    Cakes
    Edit Restaurant Street    1900 Street Taft
    Edit Restaurant City    Manila
    Edit Restaurant Open    0630AM
    Edit Restaurant Close    0830PM
    Edit Restaurant Number    091234568765
    Save Restauraunt Edit
    Restaurant Page Check    Strawberry Shortcake Blue berry pie
    [Teardown]    Close Browser

Edit Restaurant Password
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    Pokemon@yahoo.com
    Login Password    Pokemon123
    Login Submit
    Click Restaurant Edit
    Click Edit Restaurant Password
    Enter Restaurant Passwords    Pokemon123    Pokemon321
    Restaurant Page Check    Strawberry Shortcake Blue berry pie
    [Teardown]    Close Browser

Edit Restaurant Menu
    Open Browser To Login Page
    Set Selenium Implicit Wait    3
    Maximize Browser Window
    Click Login
    Login Username    Pokemon@yahoo.com
    Login Password    Pokemon321
    Login Submit
    Click Restaurant Menu
    Add Restaurant Menu Item    Cake    Food    Yummy    100
    Save Restaurant Menu
    Restaurant Page Check    Strawberry Shortcake Blue berry pie
    [Teardown]    Close Browser

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
#    Title Should Be    Login Page

Click Login
    Wait Until Element Is Visible   xpath=//div[@id='nav-menu']/ul/li/button
    Click Element   xpath=//div[@id='nav-menu']/ul/li/button
    Wait Until Element Is Visible   xpath=//input[@id='email']

Click Signup
    Wait Until Element Is Visible   xpath=//a[contains(text(),'Signup')]    timeout=10s
    Click Element   xpath=//a[contains(text(),'Signup')]

Click Restaurant
    Wait Until Element Is Visible   xpath=//a[contains(text(),'Click here to sign up as a Restaurant!')]
    Click Element   xpath=//a[contains(text(),'Click here to sign up as a Restaurant!')]
    Wait Until Element Is Enabled   xpath=(//input[@id='email'])[2]    timeout=10s

Input Email
    [Arguments]    ${email}
    Input Text    xpath=(//input[@id='email'])[2]    ${email}

Input First Name
    [Arguments]    ${username}
    Input Text    xpath=//input[@id='username']    ${username}

Input Last Name
    [Arguments]    ${lastname}
    Input Text    xpath=//input[@id='displayname']    ${lastname}

Input Address
    [Arguments]    ${street}   ${city}
    Input Text    xpath=//input[@id='street']    ${street}
    Input Text    xpath=//input[@id='city_province']    ${city}

Input Password
    [Arguments]    ${password}
    Input Text    xpath=(//input[@id='password'])[2]    ${password}

Input Password2
    [Arguments]    ${password2}
    Input Text    xpath=//input[@id='password2']    ${password2}

Input Contact No
    [Arguments]    ${number}
    Input Text    xpath=//input[@id='contactno']    ${number}

Submit Credentials
    Click Element    xpath=(//button[@type='submit'])[2]

Alert
    Alert Should Be Present    timeout=5s

Error Message
    Wait Until Element Is Visible   //*[@id="registerError"]    timeout=10s
    Element Should Be Visible   //*[@id="registerError"]

Restaurant email
    [Arguments]    ${email}
    Wait Until Element Is Visible   xpath=(//input[@id='email'])[3]
    Input Text    xpath=(//input[@id='email'])[3]    ${email}

Restaurant Display Name
    [Arguments]    ${name}
    Input Text    xpath=(//input[@id='displayname'])[2]    ${name}

Restaurant Category
    [Arguments]    ${category}
    Input Text    xpath=//input[@id='category']    ${category}

Restaurant Street Address
    [Arguments]    ${address}
    Input Text    xpath=(//input[@id='street'])[2]    ${address}

Restaurant City
    [Arguments]    ${city}
    Input Text    xpath=(//input[@id='city_province'])[2]    ${city}

Restaurant Contact No
    [Arguments]    ${number}
    Input Text    xpath=(//input[@id='contactno'])[2]    ${number}

Restaurant Times
    [Arguments]    ${open}    ${close}
    Input Text    xpath=//input[@id='open-hour']    ${open}
    Input Text    xpath=//input[@id='close-hour']    ${close}

Restaurant Password1
    [Arguments]    ${password}
    Input Text    xpath=(//input[@id='password'])[3]    ${password}

Restaurant Password2
    [Arguments]    ${password}
    Input Text    xpath=(//input[@id='password2'])[2]    ${password}

Submit Restaurant signup
    Click Element   xpath=(//button[@type='submit'])[3]

Customer Page Check
    BuiltIn.Sleep    5s
    Element Should Be Visible    xpath=//h1    timeout=5s

Restaurant Page Check
    [Arguments]    ${name}
    BuiltIn.Sleep    5s
    Element Should Be Visible    xpath=//div[@id='restaurant-profile']/div/div/h1    timeout=5s
    Element Should Contain    xpath=//div[@id='restaurant-profile']/div/div/h1    ${name}

Login Username
    [Arguments]    ${username}
    Input Text    xpath=//input[@id='email']    ${username}

Login Password
    [Arguments]    ${password}
    Input Text    xpath=//input[@id='password']    ${password}

Login Submit
    Click Element   xpath=//button[@type='submit']

Login Error
    Element Should Be Visible    xpath=//p[@id='loginError']    timeout=5s

Click User Edit
    Builtin.Sleep    2s
    Element Should Be Visible    xpath=(//button[@type='button'])[2]    timeout=5s
    Click Element    xpath=(//button[@type='button'])[2]
    Element Should Be Visible    xpath=//input[@id='custo-Fname']    timeout=5s

Edit User Name
    [Arguments]    ${name}
    Input Text    xpath=//input[@id='custo-Fname']    ${name}

Edit User Last Name
    [Arguments]    ${lastName}
    Input Text    xpath=//input[@id='custo-Lname']    ${lastName}

Edit User Street
    [Arguments]    ${street}
    Input Text    xpath=//input[@id='custo-street']    ${street}

Edit User City
    [Arguments]    ${city}
    Input Text    xpath=//input[@id='custo-city']    ${city}

Edit User Number
    [Arguments]    ${number}
    Input Text    xpath=//input[@id='custo-contact']    ${number}

Save User Edit
    Click Element    xpath=(//button[@type='submit'])[3]
    Handle Alert    action=ACCEPT    timeout=5s
    Handle Alert    action=ACCEPT    timeout=5s

Click New Password
    Builtin.Sleep    2s
    Click Element    xpath=(//button[@type='button'])[2]
    Builtin.Sleep    2s
    Element Should Be Visible    xpath=//input[@id='curr-password']    timeout=5s

Enter Customer Passwords
    [Arguments]    ${curPass}   ${newPass}
    Input Text    xpath=//input[@id='curr-password']    ${curPass}
    Input Text    xpath=//input[@id='new-password']    ${newPass}
    Input Text    xpath=//input[@id='c-new-password']    ${newPass}
    Click Element    xpath=(//button[@type='submit'])[4]
    Handle Alert    action=ACCEPT    timeout=5s
    Handle Alert    action=ACCEPT    timeout=5s

Click Restaurant Edit
    Builtin.Sleep    5s
    Element Should Be Visible    xpath=(//button[@type='button'])[2]    timeout=5s
    Click Element    xpath=(//button[@type='button'])[2]
    Element Should Be Visible    xpath=//input[@id='resto-name']    timeout=5s

Edit Restaurant Name
    [Arguments]    ${name}
    Input Text    xpath=//input[@id='resto-name']    ${name}

Edit Restaurant Desc
    [Arguments]    ${desc}
    Input Text    xpath=//textarea[@id='resto-desc']    ${desc}

Edit Restaurant Street
    [Arguments]    ${street}
    Input Text    xpath=//input[@id='resto-street']    ${street}

Edit Restaurant City
    [Arguments]    ${city}
    Input Text    xpath=//input[@id='resto-city']    ${city}

Edit Restaurant Open
    [Arguments]    ${open}
    Input Text    xpath=//input[@id='resto-open-hour']    ${open}

Edit Restaurant Close
    [Arguments]    ${close}
    Input Text    xpath=//input[@id='resto-close-hour']    ${close}

Edit Restaurant Category
    [Arguments]    ${cat}
    Input Text    xpath=//input[@id='resto-category']    ${cat}

Edit Restaurant Number
    [Arguments]    ${num}
    Input Text    xpath=//input[@id='resto-contact']    ${num}

Save Restauraunt Edit
    Click Element    xpath=(//button[@type='submit'])[3]
    Handle Alert    action=ACCEPT    timeout=5s
    Handle Alert    action=ACCEPT    timeout=5s

Click Edit Restaurant Password
    Click Element    xpath=(//button[@type='button'])[2]
    Builtin.Sleep    2s
    Element Should Be Visible    xpath=//input[@id='curr-password']    timeout=5s

Enter Restaurant Passwords
    [Arguments]    ${curPass}   ${newPass}
    Input Text    xpath=//input[@id='curr-password']    ${curPass}
    Input Text    xpath=//input[@id='new-password']    ${newPass}
    Input Text    xpath=//input[@id='c-new-password']    ${newPass}
    Click Element    xpath=(//button[@type='submit'])[4]
    Handle Alert    action=ACCEPT    timeout=5s
    Handle Alert    action=ACCEPT    timeout=5s

Click Restaurant Menu
    Builtin.Sleep    2s
    Element Should Be Visible    xpath=//a[contains(text(),'Menu')]    timeout=5s
    Click Element    xpath=//a[contains(text(),'Menu')]
    Element Should Be Visible    xpath=//button[@id='go-menu-edit']    timeout=5s
    Click Element    xpath=//button[@id='go-menu-edit']
    Element Should Be Visible    xpath=(//button[@type='button'])[2]    timeout=5s

Add Restaurant Menu Item
    [Arguments]    ${name}    ${category}    ${desc}    ${price}
    Click Element    xpath=(//button[@type='button'])[2]
    Builtin.Sleep    2s
    Element Should Be Visible    xpath=//input[@id='new-item-name']    timeout=5s
    Input Text    xpath=//input[@id='new-item-name']    ${name}
    Input Text    xpath=//input[@id='new-item-category']    ${category}
    Input Text    xpath=//textarea[@id='new-item-desc']    ${desc}
    Input Text    xpath=//input[@id='new-item-price']    ${price}
    Click Element    xpath=(//button[@type='submit'])[3]
    Handle Alert    action=ACCEPT    timeout=5s

Save Restaurant Menu
    Click Element    xpath=//button[@id='save-menu']
    Handle Alert    action=ACCEPT    timeout=5s