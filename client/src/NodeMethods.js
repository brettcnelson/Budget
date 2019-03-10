function Node(node) {
	this.name = node.name;
	this.parent = node.parent || null;
	this.limit = node.limit || 0;
	this.spent = node.spent || 0;
	this.sub = {};
	for (var key in node.sub) {
		this.sub[key] = new Node(node.sub[key]);
	}
}

Node.prototype.addCat = function(name,limit,spent) {
  if (!this.sub[name]) {
    this.sub[name] = new Node({name,parent:this,limit,spent});
    this.updateTotals();
  }
};

Node.prototype.deleteCat = function() {
  delete this.parent.sub[this.name];
  this.updateTotals();
};

Node.prototype.addTrans = function(amt) {
  this.spent += amt;
  this.updateTotals('spent');
};

Node.prototype.changeLimit = function(limit) {
  this.limit = limit;
  this.updateTotals('limit');
};

Node.prototype.updateTotals = function(tally) {
  if (!tally) {
    this.updateTotals('spent');
    this.updateTotals('limit');
  }
  else {
    this[tally] = Object.values(this.sub).reduce((a,b)=>a+b[tally],0);
    if (this.parent) {
      this.parent.updateTotals(tally);
    }
  }
};

Node.prototype.makeNew = function() {
	var root = new Node({name:'total'});
	root.addCat('mandatory');
	root.addCat('optional');
	return root;
};

export default Node.prototype;
