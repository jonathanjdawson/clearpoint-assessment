context("API endpoint health check", () => {
  it("verifies the API is live", () => {
    cy.request("GET", "/api/todoItems").then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

context("POST /api/todoItems", () => {
  it("creates one todo item", () => {
    cy.request("POST", "/api/todoItems", { description: 'item1' }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.be.a('string')
      const toDoID = response.body
    })
  })
})