var passed = 0;

function isAlive(){

	
	return true;
}

function blockCreator(){
	
	if(blockarray.length === 0){
		var block = new Block();
		blockarray.push(block);
	} 
	else{
		var last = blockarray[blockarray.length - 1];
		if(last.x < maxWidth - 8 * last.xlen){
			var block = new Block();
			blockarray.push(block);
			console.log("YEP");
		}
	}
	if(blockarray.length > passed){
		var pBlock = blockarray[passed];
		if(pBlock.x + pBlock.xlen < bird.x){
			passed++;
		}
	}
}