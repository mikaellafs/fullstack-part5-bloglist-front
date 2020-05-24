describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'Person',
      username: 'aperson',
      password: 'oursecret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  describe('Login', function () {

    it('Login form is shown', function () {
      cy.contains('Log in to application')
      cy.contains('username')
      cy.contains('password')
      cy.get('#username')
      cy.get('#password')

    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aperson')
      cy.get('#password').type('oursecret')

      cy.contains('login').click()

      cy.contains('Person logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('aperson')
      cy.get('#password').type('wrong')

      cy.contains('login').click()

      cy.contains('Wrong username or password')
      cy.get('.bad').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When user is logged in', function () {
    beforeEach(function () {
      cy.login({username :'aperson', password: 'oursecret'})
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('What a cool title')
      cy.get('#author').type('Nice guy or girl')
      cy.get('#url').type('http://whattheduck.com')

      cy.contains('create').click()

      cy.contains('What a cool title by Nice guy or girl')
    })

    describe('When there are blogs', function (){
      beforeEach(function () {
        cy.createBlog({title : 'What a cool title', author: 'Nice guy or girl', url: 'http://whattheduck.com', likes: Math.floor(Math.random()*10 +5)})
        cy.createBlog({title : 'Magaritta or Caipirinha', author: 'A drunk guy', url: 'http://beerorbeer.com', likes: Math.floor(Math.random()*10 +5)})
        cy.createBlog({title : 'Bananas de pijamas', author: 'Sergio Malandro', url: 'http://bananasdepijamas.com', likes: Math.floor(Math.random()*10 +5)})
      })

      it('A user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes 1')
      })
      
      it.only('A user can delete their blog', function () {
        cy.contains('Magaritta or Caipirinha A drunk guy').parent().find('#view').click()
        cy.contains('Magaritta or Caipirinha A drunk guy').parent().find('#delete').click()
        
        
        cy.get('html').should('not.contain', 'Magaritta or Caipirinha A drunk guy')
      })

      it.only('Blogs are ordered by number of likes', function () {

        cy.get('.numberOfLikes').then(likes => {
          for(let i = 1; i<likes.length; i++){
            let diff = Number(likes[i].textContent) - Number(likes[i-1].textContent)
            cy.expect(diff).to.be.greaterThan(-1)
          }
        })
      })
    })

  })
})