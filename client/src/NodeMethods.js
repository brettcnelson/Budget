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
};

Node.prototype.deleteTrans = function(i) {
	this.spent -= this.trans[i];
	this.trans.splice(i,1);
};

Node.prototype.changeLimit = function(limit) {
  var newLimit = limit-this.totals().limit+this.limit;
  if (newLimit>=0) {
  	this.limit = newLimit;
  }
};

Node.prototype.totals = function(limit) {
	var res = {spent:this.spent,limit:this.limit};
  if (this.sub.length) {
  	var rec = this.sub.reduce((t,s)=>{
  		var res = s.totals();
  		t.spent += res.spent;
  		t.limit += res.limit;
  		return t;
  	},{spent:0,limit:0});
  	res.spent += rec.spent;
  	res.limit += rec.limit;
  }
  return res;
};

export default Node;
