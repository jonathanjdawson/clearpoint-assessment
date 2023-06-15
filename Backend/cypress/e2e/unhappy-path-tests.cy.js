var toDoID = ''

context("POST duplicate /api/todoItems", () => {
  it("creates a duplicate toDo item", () => {
    cy.request("POST", "/api/todoItems", { description: 'item2' }).then((response) => {
      expect(response.status).to.eq(201)
      toDoID = response.body
    })
    cy.request({
      method: "POST",
      url: "/api/todoItems",
      body: { description: 'item2' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body).to.eq('A todo item with description already exists')
    })
  })
})

context("GET invalid toDo item", () => {
  it("will fail when attempting to retrieve a toDo item that does not exist", () => {
    cy.request({
      method: "GET",
      url: "/api/todoItems/0a39cd32-0b35-11ee-be56-0242ac120002",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.eq('Todo item with id 0a39cd32-0b35-11ee-be56-0242ac120002 not found') 
    })
  })
})

context("PUT update toDo item that does not exist", () => {
  it("will fail when attempting to update a toDo item that does not exist", () => {
    cy.request({
      method: "PUT",
      url: "/api/todoItems/0a39cd32-0b35-11ee-be56-0242ac120002",
      body: {
        "id": "0a39cd32-0b35-11ee-be56-0242ac120002",
        "description": "item2",
        "isCompleted": true
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.eq('Todo item with id 0a39cd32-0b35-11ee-be56-0242ac120002 not found') 
    })
  })
})

context("PUT update toDo item with invalid request body", () => {
  it("will fail when attempting to update a toDo item with an invalid request body", () => {
    cy.request({
      method: "PUT",
      url: "/api/todoItems/" + toDoID,
      body: {
        "id": "0a39cd32-0b35-11ee-be56-0242ac120002",
        "description": "invalidDescription",
        "isCompleted": true
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.eq('You are trying to update the wrong todo item') 
    })
  })
})