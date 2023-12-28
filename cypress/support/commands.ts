/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "cypress-file-upload";

export const defaultTimeout = 10000;
const opts: Partial<Cypress.Timeoutable> = {
  timeout: defaultTimeout,
};
const clickOpts: Partial<Cypress.ClickOptions> = { scrollBehavior: false };

const email = Cypress.env("TEST_EMAIL");
const password = Cypress.env("TEST_PASSWORD");
const fullname = Cypress.env("TEST_FULLNAME");

// Ensures page has loaded before running tests
// Reference: https://www.cypress.io/blog/2018/02/05/when-can-the-test-start/
Cypress.Commands.add("visitAndWait", (path: string) => {
  let appHasStarted = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function spyOnAddEventListener(win: any) {
    // win = window object in our application
    const addListener = win.EventTarget.prototype.addEventListener;
    // eslint-disable-next-line no-param-reassign
    win.EventTarget.prototype.addEventListener = function (name: string) {
      if (name === "change") {
        // web app added an event listener to the input box -
        // that means the web application has started
        appHasStarted = true;
        // restore the original event listener
        // eslint-disable-next-line no-param-reassign
        win.EventTarget.prototype.addEventListener = addListener;
      }
      // eslint-disable-next-line prefer-rest-params
      return addListener.apply(this, arguments);
    };
  }

  function waitForAppStart() {
    // keeps rechecking "appHasStarted" variable
    return new Cypress.Promise((resolve, _) => {
      // eslint-disable-next-line consistent-return
      const isReady = () => {
        if (appHasStarted) {
          return resolve();
        }
        setTimeout(isReady, 0);
      };
      isReady();
    });
  }

  cy.visit(path, {
    onBeforeLoad: spyOnAddEventListener,
    failOnStatusCode: false,
  }).then(waitForAppStart);
});

Cypress.Commands.add(
  "loginAsCypressTestingAfterNavigateToSignin",
  (redirectValue?: string) => {
    if (!password || !email) {
      throw new Error("email or password env not set");
    }
    cy.session(
      "dolthubLogin",
      () => {
        cy.visitAndWait("/auth/login");
        completeLoginForCypressTesting();
        ensureSuccessfulLogin(redirectValue);
      },
      {
        cacheAcrossSpecs: true,
      },
    );
  },
);

Cypress.Commands.add(
  "signUpAsCypressTestingAfterNavigateToSignUp",
  (redirectValue?: string) => {
    if (!password || !email) {
      throw new Error("email or password or fullname env not set");
    }
    cy.session(
      "dolthubLogin",
      () => {
        cy.visitAndWait("/auth/sign-up");
        completeSignUpForCypressTesting();
        ensureSuccessfulSignUp(redirectValue);
      },
      {
        cacheAcrossSpecs: true,
      },
    );
  },
);

Cypress.Commands.add(
  "loginAsCypressTestingFromSigninPageWithRedirect",
  (redirectValue: string) => {
    cy.location("pathname", opts).should("eq", `/auth/login`);
    cy.location("search", opts)
      .should("eq", `?redirect=%2F${redirectValue}`)
      .then(() => {
        completeLoginForCypressTesting();
        ensureSuccessfulLogin(redirectValue);
      });
  },
);

Cypress.Commands.add(
  "signUpAsCypressTestingFromSignUpPageWithRedirect",
  (redirectValue: string) => {
    cy.location("pathname", opts).should("eq", `/auth/login`);
    cy.location("search", opts)
      .should("eq", `?redirect=%2F${redirectValue}`)
      .then(() => {
        completeSignUpForCypressTesting();
        ensureSuccessfulSignUp(redirectValue);
      });
  },
);

function ensureSuccessfulLogin(redirectValue?: string) {
  // Must set cookie for localhost so navbar renders correctly
  if (Cypress.env("LOCAL_DOLTHUB")) {
    cy.setCookie("accessToken", "fake-token");
  }
  if (redirectValue) {
    cy.location("pathname", opts).should("include", `/${redirectValue}`);
  } else {
    cy.location("pathname", opts).should("include", "/");
  }
}

function completeLoginForCypressTesting() {
  // Check that email form has rendered
  cy.get("[data-cy=signin-email-form]", opts).should("be.visible");

  // Enter email and password in inputs
  cy.get("input[name=email]", opts)
    .should("be.visible")
    .type(email, { ...clickOpts, log: false });
  cy.get("input[name=email]").should("have.value", email);
  cy.get("input[name=password]", opts).should("be.visible");
  cy.get("input[name=password]", opts).type(password, {
    ...clickOpts,
    log: false,
  });
  cy.get("input[name=password]", opts).type("{enter}", clickOpts);
}

function ensureSuccessfulSignUp(redirectValue?: string) {
    // Must set cookie for localhost so navbar renders correctly
    if (Cypress.env("LOCAL_DOLTHUB")) {
        cy.setCookie("accessToken", "fake-token");
    }
    if (redirectValue) {
        cy.location("pathname", opts).should("include", `/${redirectValue}`);
    } else {
        cy.location("pathname", opts).should("include", "/");
    }
}

function completeSignUpForCypressTesting() {
    // Check that email form has rendered
    cy.get("[data-cy=signup-email-form]", opts).should("be.visible");

    // Enter email and password in inputs
    cy.get("input[name=email]", opts)
        .should("be.visible")
        .type(email, { ...clickOpts, log: false });
    cy.get("input[name=email]").should("have.value", email);
    cy.get("input[name=fullname]", opts)
        .should("be.visible")
        .type(fullname, { ...clickOpts, log: false });
    cy.get("input[name=fullname]").should("have.value", email);
    cy.get("input[name=password]", opts).should("be.visible");
    cy.get("input[name=password]", opts).type(password, {
        ...clickOpts,
        log: false,
    });
    cy.get("input[name=password]", opts).type("{enter}", clickOpts);
}



Cypress.Commands.add("signout", isMobile => {
  if (!isMobile) {
    cy.get("[data-cy=navbar-menu-avatar]", opts).click(clickOpts);
    cy.get("[data-cy=sign-out-button-desktop]", opts).click(clickOpts);
  } else {
    cy.get("[data-cy=mobile-navbar-menu-button]", opts).click(clickOpts);
    cy.get("[data-cy=sign-out-button-mobile]", opts).click(clickOpts);
  }
  cy.clearCookie("accessToken");
});

Cypress.Commands.add("visitPage", (currentPage: string, loggedIn: boolean) => {
  if (loggedIn) {
    // If page tests require a user to be logged in, go to signin page and log in test user
    cy.loginAsCypressTestingAfterNavigateToSignin();
  }

  // 404 page should be rendered when page not found
  cy.visitAndWait(currentPage);
});

Cypress.on(
  "uncaught:exception",
  err => !err.message.includes("ResizeObserver loop limit exceeded"),
);

Cypress.Commands.add("ignoreUncaughtErrors", (errorMessages: string[]) => {
  errorMessages.forEach(errorMessage => {
    cy.on("uncaught:exception", err => {
      if (err.message.includes(errorMessage)) {
        return false;
      }
      return true;
    });
  });
});