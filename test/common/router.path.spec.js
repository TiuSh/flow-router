Router = FlowRouter.Router;

Tinytest.add('Common - Router - validate path definition', function (test, next) {
  // path must start with '/'
  test.throws(function() {
    FlowRouter.route(Random.id());
  });
});

Tinytest.add('Common - Router - path - generic', function (test) {
  var pathDef = "/blog/:blogId/some/:name";
  var fields = {
    blogId: "1001",
    name: "superb"
  };
  var expectedPath = "/blog/1001/some/superb";

  var path = FlowRouter.path(pathDef, fields);
  test.equal(path, expectedPath);
});

Tinytest.add('Common - Router - path - queryParams', function (test) {
  var pathDef = "/blog/:blogId/some/:name";
  var fields = {
    blogId: "1001",
    name: "superb"
  };

  var queryParams = {
    aa: "100",
    bb: "200"
  };

  var expectedPath = "/blog/1001/some/superb?aa=100&bb=200";

  var path = FlowRouter.path(pathDef, fields, queryParams);
  test.equal(path, expectedPath);
});

Tinytest.add('Common - Router - path - just queryParams', function (test) {
  var pathDef = "/blog/abc";
  var queryParams = {
    aa: "100",
    bb: "200"
  };

  var expectedPath = "/blog/abc?aa=100&bb=200";

  var path = FlowRouter.path(pathDef, null, queryParams);
  test.equal(path, expectedPath);
});


Tinytest.add('Common - Router - path - missing fields', function (test) {
  var pathDef = "/blog/:blogId/some/:name";
  var fields = {
    blogId: "1001",
  };
  var expectedPath = "/blog/1001/some/";

  var path = FlowRouter.path(pathDef, fields);
  test.equal(path, expectedPath);
});

Tinytest.add('Common - Router - path - no fields', function (test) {
  var pathDef = "/blog/blogId/some/name";
  var path = FlowRouter.path(pathDef);
  test.equal(path, pathDef);
});

Tinytest.add('Common - Router - path - complex route', function (test) {
  var pathDef = "/blog/:blogId/some/:name(\\d*)+";
  var fields = {
    blogId: "1001",
    name: 20
  };
  var expectedPath = "/blog/1001/some/20";

  var path = FlowRouter.path(pathDef, fields);
  test.equal(path, expectedPath);
});

Tinytest.add('Common - Router - path - optional last param missing', function (test) {
  var pathDef = "/blog/:blogId/some/:name?";
  var fields = {
    blogId: "1001"
  };
  var expectedPath = "/blog/1001/some/";

  var path = FlowRouter.path(pathDef, fields);
  test.equal(path, expectedPath);
});

Tinytest.add('Common - Router - path - optional last param exists', function (test) {
  var pathDef = "/blog/:blogId/some/:name?";
  var fields = {
    blogId: "1001",
    name: 20
  };
  var expectedPath = "/blog/1001/some/20";

  var path = FlowRouter.path(pathDef, fields);
  test.equal(path, expectedPath);
});
