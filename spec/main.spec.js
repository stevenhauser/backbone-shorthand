var Backbone = require("backbone"),
    shorthand = require("./../src/backbone.shorthand.js");


describe("backbone.shorthand", function() {


  it("should attach itself to Backbone.Model", function() {
    expect(Backbone.Model.shorthandify).toBeDefined();
  });


  describe("creating shorthand methods", function() {

    it("should create desired shorthand methods from a `shorthand` array", function() {
      var Model = Backbone.Model.extend({
        shorthand: ["prop1"]
      }).shorthandify();

      expect(Model.prototype.prop1).toBeDefined();
    });

    it("should create desired shorthand methods from a `shorthand` string", function() {
      var Model = Backbone.Model.extend({
        shorthand: "prop1"
      }).shorthandify();

      expect(Model.prototype.prop1).toBeDefined();
    });

    it("should create shorthand methods directly via array", function() {
      var Model = Backbone.Model.extend();
      Model.shorthandify(["prop1"]);
      expect(Model.prototype.prop1).toBeDefined();
    });

    it("should create shorthand methods directly via string", function() {
      var Model = Backbone.Model.extend();
      Model.shorthandify("prop1");
      expect(Model.prototype.prop1).toBeDefined();
    });

  });


  describe("getters and setters", function() {

    var initialValue = "something",
        secondValue = "something else",
        Model, model;

    beforeEach(function() {
      Model = Backbone.Model.extend({
        shorthand: "prop1"
      }).shorthandify();

      model = new Model({ prop1: initialValue });
    });

    afterEach(function() {
      model && model.off();
    });

    it("should make getters when arguments are not passed", function() {
      expect(model.prop1()).toEqual(initialValue);
    });

    it("should make setters when arguments are passed", function() {
      model.prop1(secondValue);
      expect(model.prop1()).toEqual(secondValue);
    });

    it("should preserve the chain when setting", function() {
      model.prop1(secondValue).prop1("something elser");
      expect(model.prop1()).toEqual("something elser");
    });


    describe("event triggering", function() {

      var handlerObj;

      beforeEach(function() {
        handlerObj = { handler1: function(model, prop1Val) {} };
        spyOn(handlerObj, "handler1");
        model.on("change:prop1", handlerObj.handler1);
        model.prop1(secondValue);
      });

      it("should trigger events when setting", function() {
        expect(handlerObj.handler1).toHaveBeenCalled();
      });

      it("should respect options", function() {
        model.prop1(initialValue, { silent: true });
        expect(handlerObj.handler1.calls.length).toEqual(1);
      });

    });

  });

});
