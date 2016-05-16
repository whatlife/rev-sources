function netinnetAlert(title) {
	if(typeof unloadMask === 'function')unloadMask();
	return alert(title);
}

function netinnetConfirm(title) {
  return confirm(title);
}

