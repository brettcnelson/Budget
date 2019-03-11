function Node(node,parent) {
	this.name = node.name;
	this.parent = parent || null;
	this.limit = node.limit || 0;
	this.spent = node.spent || 0;
	this.trans = node.trans || [];
	this.sub = [];
	if (node.sub) {
		node.sub.forEach(s=>this.sub.push(new Node(s,this)));
	}
}

Node.prototype.addCat = function(name,limit,spent) {
  if (!this.sub.some(s=>s.name===name)) {
    this.sub.push(new Node({name,limit,spent},this));
    if (spent) {
    	this.sub[this.sub.length-1].trans.push(spent);
    }
  }
};

Node.prototype.deleteCat = function(i) {
	if (this.parent) {
	  this.parent.sub.splice(i,1);
	}
};

Node.prototype.addTrans = function(amt) {
  this.spent += amt;
  this.trans.push(amt);
  console.log('trans',this.trans);
};

Node.prototype.changeLimit = function(limit) {
  this.limit = limit;
};

export default Node;
