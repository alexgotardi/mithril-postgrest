describe("m.postgrest.filtersVm", function(){
  var vm = null;

  beforeEach(function(){
    vm = m.postgrest.filtersVM({id: 'eq', name: 'ilike', value: 'between'});
  });

  it("should have a getter for each attribute plus one for order", function() {
    expect(vm.id).toBeFunction();
    expect(vm.name).toBeFunction();
    expect(vm.value['lte']).toBeFunction();
    expect(vm.value['gte']).toBeFunction();
    expect(vm.order).toBeFunction();
  });

  it("should have a parameters function", function() {
    expect(vm.parameters).toBeFunction();
  });

  it("the parameters function should build an object for the request using PostgREST syntax", function() {
    vm.id(7);
    vm.name('foo');
    vm.value['gte'](1);
    vm.value['lte'](2);
    vm.order({name: 'asc', id: 'desc'});
    expect(vm.parameters()).toEqual({id: 'eq.7', name: 'ilike.*foo*', order: 'name.asc,id.desc', value: ['gte.1', 'lte.2']})
  });

  it("the parameters function should skip undefined values", function() {
    vm.id(undefined);
    vm.name(undefined);
    vm.value['lte'](undefined);
    vm.value['gte'](undefined);
    vm.order(undefined);
    expect(vm.parameters()).toEqual({})
  });

  it("the parameters function should skip blank values", function() {
    vm.id('');
    vm.name('');
    vm.value['lte']('');
    vm.value['gte']('');
    vm.order('');
    expect(vm.parameters()).toEqual({})
  });
});
