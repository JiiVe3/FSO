describe('Blog app', function() {
  describe('Before Login', function() {
    beforeEach(function() {
      cy.resetData()
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('test')
      cy.get('#passwordInput').type('pass1234')
      cy.get('#loginButton').click()

      cy.get('#info')
        .should('contain', 'You have logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('tet')
      cy.get('#passwordInput').type('pas1234')
      cy.get('#loginButton').click()

      cy.get('#info')
        .should('contain', 'Failed to log in')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('After login', function() {
    beforeEach(function() {
      cy.resetData()
      cy.login({username: 'test', password: 'pass1234'})
      cy.visit('http://localhost:3000')
    })
  
    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#titleInput').type('Test blog 1')
      cy.get('#authorInput').type('Test author')
      cy.get('#urlInput').type('test.url')
      cy.get('#submitButton').click()

      cy.get('.blog')
        .should('contain', 'Test blog 1')
    })

    describe('With existing blogs', function() {
      beforeEach(function() {
        cy.createBlog({title: 'Test blog 1', author: 'Test author', url: 'test.url', likes: 0})
        cy.createBlog({title: 'Test blog 2', author: 'Test author', url: 'test.url', likes: 3})
        cy.createBlog({title: 'Test blog 3', author: 'Test author', url: 'test.url', likes: 9})
        cy.createBlog({title: 'Test blog 4', author: 'Test author', url: 'test.url', likes: 6})
        cy.visit('http://localhost:3000')
      })

      it('A blog can be liked', function() {
        cy.contains('Test blog 1').as('blog1')
        cy.get('@blog1').find('.viewButton').click()
        cy.get('@blog1').find('.likeButton').click()
        cy.get('@blog1').contains('likes 1')
      })

      it('A blog can be removed', function() {
        cy.contains('Test blog 4').as('blog4')
        cy.get('@blog4').find('.viewButton').click()
        cy.get('@blog4').find('.removeButton').click()
        cy.get('.blog').should('not.contain', 'Test blog 4')
      })

      it('A blog cannot be removed by another user', function() {
        const user = {
          name: 'test girl',
          username: 'girl',
          password: 'pass1234'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.login({username: 'girl', password: 'pass1234'})
        cy.visit('http://localhost:3000')
        cy.contains('Test blog 2').as('blog2')
        cy.get('@blog2').find('.viewButton').click()
        cy.get('@blog2').should('not.contain', 'remove')
      })

      it('Blogs are ordered according to likes', function() {
        cy.get('.viewButton').click({multiple: true})
        cy.get('.likes').then(spans => {
          let isOrdered
          let lastLikes

          spans.toArray().forEach(span => {
            if(lastLikes){
              if(isOrdered !== false) isOrdered = lastLikes > parseInt(span.textContent)
            }
            lastLikes = parseInt(span.textContent)
          })

          expect(isOrdered).to.be.true
        })
      })
    })
  })
})