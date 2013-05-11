## backbone.shorthand

Provides shorthand methods to the attributes you declare on
your Backbone models.


### Declaring shorthand attributes

You can create shorthand methods for attributes by declaring a
`shorthand` property on your model's `prototype` or through `extend`.
Then call `shorthandify` on the model's constructor to create
the methods on its prototype.

```
var Model = Backbone.Model.extend({
  shorthand: ["prop1", "prop2", "prop3"]
}).shorthandify();

var model = new Model({ prop1: "prop one", prop2: "prop two" });

model.prop1(); // => "prop one"
model.prop2(); // => "prop two"
model.prop3(); // => undefined

model
  .prop3("prop three") // preserves chain
  .prop2("prop 2!");

model.prop3(); // => "prop three"
model.prop2(); // => "prop 2!"
```


### Passing shorthand attributes

If you prefer to pass attributes instead of declaring them on
your model's prototype, that's easy to do as well.

```
var Model = Backbone.Model.extend();

// Pass an array of attributes to shorthandify.
Model.shorthandify(["prop4", "prop5"]);

var model = new Model({ prop4: "prop four", prop5: "prop five" });

model.prop4(); // => "prop four"
model.prop5(); // => "prop five"
model.prop5("prop 5!").prop5(); // => "prop 5!"

// Pass a string for a single attribute to shorthandify.
Model.shorthandify("prop6");

model.prop6("prop six").prop6(); // => "prop six"
```


### Options

Note that any options passed along are preserved when setting
a value for an attribute, so for instance you can still make
changes `silent: true` if desired.

```
var Model = Backbone.Model.extend({
  shorthand: ["prop7", "prop8", "prop9"]
}).shorthandify();

model = new Model();

model.on("change:prop7", function() { console.log("changed"); });

model.prop7("prop seven").prop7() // logs "changed", => "prop seven"
model.prop7("prop 7!", { silent: true }).prop7() // doesn't log "changed", => "prop 7!"
```
