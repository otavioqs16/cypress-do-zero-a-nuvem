describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.clock();
    const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 10);

    // Preenchendo campo Nome
    cy.get("#firstName").as("nameField").should("be.visible").type("Otávio");
    cy.get("@nameField").should("have.value", "Otávio");

    // Preenchendo campo Sobrenome
    cy.get("#lastName")
      .as("lastnameField")
      .should("be.visible")
      .type("Queiroz");
    cy.get("@lastnameField").should("have.value", "Queiroz");

    // Preenchendo campo E-mail
    cy.get("#email").as("email").should("be.visible").type("otavio@email.com");
    cy.get("@email").should("have.value", "otavio@email.com");

    // Preenchendo campo Feedback
    cy.get("#open-text-area")
      .as("feedback")
      .should("be.visible")
      .type(longText, { delay: 0 });
    cy.get("@feedback").should("have.value", longText);

    // Clicando no botão 'Enviar'
    cy.get(".button").click();

    // Verificando exibição da mensagem de sucesso
    cy.get(".success > strong").should("be.visible");

    // Verificando que a mensagem de sucesso deixa de ser exibida após 3 segundos
    cy.tick(3000);
    cy.get(".success > strong").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    // Preenchendo campo Nome
    cy.clock();
    cy.get("#firstName").as("nameField").should("be.visible").type("Otávio");
    cy.get("@nameField").should("have.value", "Otávio");

    // Preenchendo campo Sobrenome
    cy.get("#lastName")
      .as("lastnameField")
      .should("be.visible")
      .type("Queiroz");
    cy.get("@lastnameField").should("have.value", "Queiroz");

    // Preenchendo campo E-mail
    cy.get("#email").as("email").should("be.visible").type("email");
    cy.get("@email").should("have.value", "email");

    // Preenchendo campo Feedback
    cy.get("#open-text-area")
      .as("feedback")
      .should("be.visible")
      .type("Testando com Cypress");
    cy.get("@feedback").should("have.value", "Testando com Cypress");

    cy.get(".button").click();
    cy.get(".error > strong").should("be.visible");
    cy.tick(3000);
    cy.get(".error > strong").should("not.be.visible");
  });

  it("verifica campo telefone vazio ao preencher com valor não numérico", () => {
    cy.get("#phone").as("phone").should("be.visible").type("abc");
    cy.get("@phone").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();
    // Preenchendo campo Nome
    cy.get("#firstName").as("nameField").should("be.visible").type("Otávio");
    cy.get("@nameField").should("have.value", "Otávio");

    // Preenchendo campo Sobrenome
    cy.get("#lastName")
      .as("lastnameField")
      .should("be.visible")
      .type("Queiroz");
    cy.get("@lastnameField").should("have.value", "Queiroz");

    // Preenchendo campo E-mail
    cy.get("#email").as("email").should("be.visible").type("email");
    cy.get("@email").should("have.value", "email");

    // Preenchendo campo Feedback
    cy.get("#open-text-area")
      .as("feedback")
      .should("be.visible")
      .type("Testando com Cypress");
    cy.get("@feedback").should("have.value", "Testando com Cypress");

    cy.get("#phone-checkbox").check();

    cy.get(".button").click();
    cy.get(".error > strong").should("be.visible");
    cy.tick(3000);
    cy.get(".error > strong").should("not.be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    // Preenchendo campo Nome
    cy.get("#firstName").as("nameField").should("be.visible").type("Otávio");
    cy.get("@nameField").should("have.value", "Otávio");
    cy.get("@nameField").clear();
    cy.get("@nameField").should("have.value", "");

    // Preenchendo campo Sobrenome
    cy.get("#lastName")
      .as("lastnameField")
      .should("be.visible")
      .type("Queiroz");
    cy.get("@lastnameField").should("have.value", "Queiroz");
    cy.get("@lastnameField").clear();
    cy.get("@lastnameField").should("have.value", "");

    // Preenchendo campo E-mail
    cy.get("#email").as("email").should("be.visible").type("email");
    cy.get("@email").should("have.value", "email");
    cy.get("@email").clear();
    cy.get("@email").should("have.value", "");

    // Preenchendo campo Feedback
    cy.get("#phone").as("phone").should("be.visible").type("99656357");
    cy.get("@phone").should("have.value", "99656357");
    cy.get("@phone").clear();
    cy.get("@phone").should("have.value", "");
  });

  Cypress._.times(5, () => {
    it('verifica botão com "contains"', () => {
      cy.clock();
      cy.contains("button", "Enviar").click();
      cy.get(".error > strong").should("be.visible");
      cy.tick(3000);
      cy.get(".error > strong").should("not.be.visible");
    });
  });

  it("preenche envia formulário com comando customizado", () => {
    const data = {
      firstName: "Jose",
      lastName: "da Silva",
      email: "otavio@email.com",
      text: "Testando com Cypress!",
    };

    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube");
    cy.get("#product").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check();
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .selectFile("./cypress/fixtures/example.json")
      .then((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("seleciona um arquivo da pasta fixtures, simulando drag-and-drop", () => {
    cy.get('input[type="file"]')
      .selectFile("./cypress/fixtures/example.json", {
        action: "drag-drop",
      })
      .should((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("myFile");

    cy.get('input[type="file"]')
      .selectFile("@myFile")
      .should((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "target", "_blank")
      .and("have.attr", "href", "privacy.html");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();
    //cy.get("#title").should("be.visible").and("have.text", "CAC TAT - Política de Privacidade");
    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });

  it("testa a página da política de privacidade de forma independente", () => {
    cy.get("a").invoke("removeAttr", "target").click();
    cy.get("#title").should("have.text", "CAC TAT - Política de Privacidade");
  });

  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche o campo da área de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "Testando invoke para preenchimento de texto")
      .should("have.value", "Testando invoke para preenchimento de texto");
  });

  it("faz uma requisição HTTP", () => {
    cy.request({
      method: "GET",
      url: "https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html",
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).includes("CAC TAT");
    });
  });

  it("DESAFIO: verifica existência do gato na aplicação", () => {
    // Verifica a existência do gato no body da aplicação
    cy.request({
      method: "GET",
      url: "https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html",
    }).then((response) => {
      expect(response.body).includes("cat");
    });

    // Após garantir a existência, deixa o gato visível
    cy.get("span[id='cat']").invoke("show").should("be.visible");

    // Altera o texto do título da aplicação, utilizando invoke
    cy.get("#title").invoke("text", "CAT TAT");
  });
});
