describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mr. Tester',
      username: 'tester',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('it shows the login form', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
    cy.get('#username').type('tester')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('Mr. Tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('can create a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Testing with Cypress')
      cy.get('#author').type('Mr. Tester')
      cy.get('#url').type('test.io')
      cy.get('#submit-button').click()

      cy.contains('Testing with Cypress Mr. Tester')
    })

    describe('When a blog was created', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('Testing with Cypress')
        cy.get('#author').type('Mr. Tester')
        cy.get('#url').type('test.io')
        cy.get('#submit-button').click()
      })

      it('can be liked', function() {
        cy.get('.blog-title').click()
        cy.get('.like-button').click()

        cy.contains('1 like')
      })

      it('can be deleted by the user who created it', function() {
        cy.get('.blog-title').click()

        cy.contains('remove')
      })

      it('cannot be deleted when it was created by another user', function() {
        // Create a new user
        const anotherUser = {
          name: 'Anonymous',
          username: 'anonymous',
          password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)

        // Logout current user
        cy.contains('logout').click()

        // Login new user
        cy.get('#username').type('anonymous')
        cy.get('#password').type('secret')
        cy.get('#login-button').click()

        // Expand blog entry
        cy.get('.blog-title').click()

        cy.contains('remove').should('not.be.visible')
      })
    })
  })
})
