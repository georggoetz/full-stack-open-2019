describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mr. Tester',
      username: 'tester',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('it shows the login form', () => {
    cy.contains('log in to application')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
    cy.get('#username').type('tester')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('Mr. Tester logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'tester', password: 'secret' })
    })

    it('can create a blog', () => {
      cy.contains('new blog').click()
      cy.get('#title').type('Testing with Cypress')
      cy.get('#author').type('Mr. Tester')
      cy.get('#url').type('test.io')
      cy.get('#submit-button').click()

      cy.contains('Testing with Cypress Mr. Tester')
    })

    describe('When a blog was created', () => {
      beforeEach(() => {
        cy.contains('new blog').click()
        cy.get('#title').type('Testing with Cypress')
        cy.get('#author').type('Mr. Tester')
        cy.get('#url').type('test.io')
        cy.get('#submit-button').click()
      })

      it('can be liked', () => {
        cy.get('.blog-title').click()
        cy.get('.like-button').click()

        cy.contains('1 like')
      })

      it('can be deleted by the user who created it', () => {
        cy.get('.blog-title').click()

        cy.contains('remove')
      })

      it('cannot be deleted when it was created by another user', () => {
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

    describe('Multiple blogs', () => {
      const blogs = [
        { title: 'Blog 1', author: 'Mr. Tester', url: 'tester.io', likes: 1 },
        { title: 'Blog 2', author: 'Mr. Tester', url: 'tester.io', likes: 10 },
        { title: 'Blog 3', author: 'Mr. Tester', url: 'tester.io', likes: 7 }]

      beforeEach(() => {
        for (var i = 0; i < blogs.length; i++) {
          cy.createBlog(blogs[i])
        }
      })

      it('should be ordered by likes', () => {
        cy.get('.blog-title')
          .should($div => {
            expect($div).to.have.length(3)

            const text = $div.map((i, el) => {
              console.log(el)
              return Cypress.$(el).text()
            })

            expect(text.get()).to.deep.eq([
              'Blog 2 Mr. Tester',
              'Blog 3 Mr. Tester',
              'Blog 1 Mr. Tester'
            ])
          })
      })
    })

  })
})
