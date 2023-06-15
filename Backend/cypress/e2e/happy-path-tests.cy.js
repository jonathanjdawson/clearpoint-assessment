var toDoID = ''

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
      toDoID = response.body
    })
  })
})

context("GET recently created toDo item", () => {
  it("returns the recently created toDo item", () => {
    cy.request("GET", "/api/todoItems/" + toDoID).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(toDoID)
      expect(response.body.description).to.eq("item1")
      expect(response.body.isCompleted).to.eq(false)
    })
  })
})

context("PUT /api/todoItems/{id}", () => {
  it("marks the recently created toDo item as completed", () => {
    cy.request("PUT", "/api/todoItems/" + toDoID,{ "id": toDoID, "description": "item1", "isCompleted": true }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })
})