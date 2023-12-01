/// <reference types="cypress"/>

function formatFutureDate() {
    //setting up date of birth exactly 1 year back!
    const currentDate = new Date();
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + 365);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  describe("Name Input Validation Testsuit", function () {
    beforeEach(() => {
      cy.visit("./qa.html");
    });
    it("Verify that name can only be of string type", () => {
      let intValue = 'Anna';
      cy.get("#yourName")
        .clear()
        .type(intValue)
        .invoke("val") // Get the value of the input
        .then((val) => {
          expect(typeof val).to.be.a("string"); // Check if the value is a string
          expect(val).to.not.match(/\d/); // Check if the value does not contain numeric characters
        });
    });
    it("Verify that Script Injection is Prevented", () => {
      const scriptInjection = '<script>alert("Hack")</script>';
      cy.get("#yourName")
        .clear()
        .type(scriptInjection)
        .should("not.have.text", scriptInjection);
    });
    it('Verify that Restricted Keywords - "Admin" are not allowed', () => {
      const restrictedKeyword = "Admin";
      cy.get("#yourName")
        .clear()
        .type(restrictedKeyword)
        .should("not.have.text", restrictedKeyword);
    });
  
    it("Verify that SQL Injection Prevention", () => {
      const sqlInjection = "Robert'; DROP TABLE Students; --";
      cy.get("#yourName")
        .clear()
        .type(sqlInjection)
        .should("not.have.text", sqlInjection);
    });
  
    it(" Should handle Special Characters in Names", () => {
      const specialCharactersName = "Anna Mack!@#$%^&*()_+ Khaliq";
      cy.get("#yourName")
        .clear()
        .type(specialCharactersName)
        .should("have.value", specialCharactersName);
    });
  
    it("Should verify that Name can't be alphanumeric", () => {
      cy.get("#yourName")
        .clear()
        .type("Anna Mack123")
        .should("not.have.text", "Anna Mack123");
    });
  
    it("Should verify that name can't be only digits", () => {
      cy.get("#yourName").clear().type("123").should("not.have.text", "123");
    });
  
    it("Should verify that special characters shouldn't be allowed", () => {
      cy.get("#yourName").clear().type("$%&").should("not.have.text", "$%&");
    });
  
    it("Should verify that name should not be case-sensitive", () => {
      cy.get("#yourName")
        .clear()
        .type("anna mack")
        .should("have.value", "anna mack");
      cy.get("#yourName")
        .clear()
        .type("Anna Mack")
        .should("have.value", "Anna Mack");
    });
  
    it("Should verify that name length should not exceed more than 30", () => {
      cy.get("#yourName")
        .clear()
        .type("abcdefghijklmnopqrstuvwxyz123456")
        .should("not.have.text", "abcdefghijklmnopqrstuvwxyz123456");
    });
  
    it("Should verify that field should be empty", () => {
      cy.get("#yourName").clear();
      cy.get("#yourName").should("have.value", "");
    });
  
    it("Should verify that minimum length of name should be 3", () => {
      cy.get("#yourName").clear().type("Ana").should("have.value", "Ana");
      cy.get('[type="button"]').click();
      cy.on("window:alert", (message) => {
        expect(message).to.equal(
          "Name character length should be greater than 3"
        );
        })
    });
  
    it("Verify that empty name field should not be accepted", () => {
      cy.get('[type="button"]').click();
      cy.on("window:alert", (message) => {
        expect(message).to.equal(
          "Name is required"
        );
        })
    });
  
    it("Verify that only with valid input, the form should be accepted", () => {
      cy.get("#yourName").clear().type("Anna Mack");
      cy.get('[type="button"]').click();
      cy.on("window:alert", (message) => {
        expect(message).to.equal(
          "Hi, Anna Mack! You have been alive for NaN day(s)!"
        );
      });
    });
  
    it("The system should correctly handle names with spaces", () => {
      cy.get("#yourName")
        .clear()
        .type("Anna Mack")
        .should("have.value", "Anna Mack");
        
    });
  });
  
  describe("Date of Birth Input Validation Testsuit", () => {
    beforeEach(() => {
      cy.visit("./qa.html");
    });
    it("Should verify the valid Date of Birth", () => {
      cy.get("#birthdate")
        .clear()
        .type("2023-11-30")
        .should("have.value", "2023-11-30");
      cy.get("#birthdate")
        .clear()
        .type("2023/11/30")
        .should("have.value", "2023/11/30");
      cy.get("#birthdate")
        .clear()
        .type("2023,11,30")
        .should("have.value", "2023,11,30");
    });
    it("Should verify that only valid dates are accepted", () => {
      cy.get("#birthdate")
        .clear()
        .type("0000-00-00")
        .should("not.have.text", "0000-00-00"); // Invalid, all zeros
      cy.get("#birthdate")
        .clear()
        .type("2023-13-30")
        .should("not.have.text", "2023-13-30"); // Invalid, month greater than 12
      cy.get("#birthdate")
        .clear()
        .type("2023-11-32")
        .should("not.have.text", "2023-11-32"); // Invalid, day greater than 31
      cy.get("#birthdate")
        .clear()
        .type("-2023-11-30")
        .should("not.have.text", "-2023-11-30"); // Invalid, negative date
    });
    it("Should verify that Leap Year dates are accepted", () => {
      cy.get("#birthdate")
        .clear()
        .type("2024-02-29")
        .should("have.value", "2024-02-29"); // Leap Year
      cy.get("#birthdate")
        .clear()
        .type("2023-02-29")
        .should("not.have.text", "2023-02-29"); // Not a Leap Year
    });
    it("Should verify an Incomplete Date", () => {
      cy.get("#birthdate")
        .clear()
        .type("2023-11")
        .should("not.have.text", "2023-11");
      cy.get("#birthdate")
        .clear()
        .type("No 30 2023")
        .should("not.have.text", "No 30 2023");
    });
  
    it("Should verify a Date with Incorrect Format", () => {
      cy.get("#birthdate")
        .clear()
        .type("11-30-2023")
        .should("not.have.text", "11-30-2023");
    });
    it("Do Not Enter Anything (Field Should Be Empty)", () => {
      cy.get("#birthdate").clear().should("have.value", "");
    });
  
    it("Should verify a Future Date", () => {
      const futureDate = formatFutureDate();
      cy.get("#birthdate")
        .clear()
        .type(futureDate)
        .should("not.have.text", futureDate);
    });
  
    it("Should verify a Date in the Distant Past", () => {
      const distantPastDate = "1900-01-01";
      cy.get("#birthdate")
        .clear()
        .type(distantPastDate)
        .should("have.value", distantPastDate);
    });
  
    it("Should verify a Date with Special Characters", () => {
      const specialCharactersDate = "2023!11!30";
      cy.get("#birthdate")
        .clear()
        .type(specialCharactersDate)
        .should("not.have.text", specialCharactersDate);
    });
  
    it("Should verify a Date with Spaces", () => {
      const dateWithSpaces = "2023 11 30";
      cy.get("#birthdate")
        .clear()
        .type(dateWithSpaces)
        .should("have.value", dateWithSpaces);
    });
  
    it('Should verify an Invalid Date (e.g., "2023-02-30")', () => {
      cy.get("#birthdate")
        .clear()
        .type("2023-02-30")
        .should("not.have.text", "2023-02-30");
    });
    it("Ensure that date should not acccept random Alphanumerics", () => {
      cy.get("#birthdate")
        .clear()
        .type("2023a11b30")
        .should("not.have.text", "2023a11b30");
    });
  
    it("Verify that Date should accept month in Alphabets", () => {
      cy.get("#birthdate")
        .clear()
        .type("2023-Nov-30")
        .should("have.value", "2023-Nov-30");
      cy.get("#birthdate")
        .clear()
        .type("Nov 2023 30")
        .should("have.value", "Nov 2023 30");
      cy.get("#birthdate")
        .clear()
        .type("Nov-30-2023")
        .should("have.value", "Nov-30-2023");
      cy.get("#birthdate")
        .clear()
        .type("November 30 2023")
        .should("have.value", "November 30 2023");
    });
    it('Enter a Date with Month and Day Swapped (e.g., "2023-30-11")', () => {
      cy.get("#birthdate")
        .clear()
        .type("2023-30-11")
        .should("not.have.text", "2023-30-11");
    });
    it("Shoudl verify that Form normal flow is working ", function () {
      cy.get("#yourName").clear().type("Anna Mack");
  
      cy.get("#birthdate").clear().type("2000-11-30");
      cy.get('[type="button"]').click();
      cy.wait(3000);
      cy.on("window:alert", (message) => {
        expect(message).to.equal(
          "Hi, Anna Mack! You have been alive for 8401 day(s)!"
        );
      });
    });
  });
  
  describe("Logo Test Scenarios", function () {
    const logoSrc =
      "https://www.wilsonlanguage.com/wp-content/themes/wilson-nov/img/logo.svg";
  
    beforeEach(() => {
      cy.visit("./qa.html");
    });
  
    it("Ensure Image Source Validation", () => {
      cy.get("img")
        .should("be.visible")
        .and("have.attr", "src")
        .and("include", logoSrc);
    });
  
    it("Should check the Image Size", () => {
      cy.get("img")
        .should("have.attr", "height", "128px")
        .and("have.attr", "width", "128px");
    });
  
    it("Should check Image Alignment", () => {
      cy.get("img").then((image) => {
        const imagePosition = image.position();
        expect(imagePosition.left).to.equal(436); // Check if the image is aligned to the left
        expect(imagePosition.top).to.equal(106.90625); // Check if the image is aligned to the top
      });
    });
  
    it("Should check the responsiveness of app", () => {
      cy.viewport(320, 480); // Example: Mobile view
      cy.get("img").should("have.css", "width", "100%"); 
  
      cy.viewport(768, 1024); // Example: Tablet view
      cy.get("img").should("have.css", "width", "50%"); 
    });
  
    it("Should check the accessibility of app", () => {
      cy.get("img").should("have.attr", "alt").and("not.be.empty");
    });
  
    it("Should check the Performance regardging load time of the app", () => {
      // Measure time it takes for the logo to load
      const loadStartTime = Date.now();
      cy.get("img").should("be.visible");
      const loadEndTime = Date.now();
      const loadTime = loadEndTime - loadStartTime;
      expect(loadTime).to.be.lessThan(2000); 
    });
  
    it("Should handle Broken Image", () => {
      // Intentionally break the image URL
      cy.get("img").invoke("attr", "src", "broken_url");
      // Verify how the application handles broken image link
      cy.contains("This is a sample app").should("be.visible");
    });
  
    it("Should ensure that no security risks associated with the image", () => {
      cy.get("img")
        .should("have.attr", "src")
        .and("match", /^https:\/\//);
    });
  });