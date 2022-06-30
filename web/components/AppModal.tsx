import React, { useState, useEffect } from 'react';
import Modal from '@mui/material';

const AppModal = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<></>
		// <Modal
		// 	open={open}
		// 	onClose={handleClose}
		// 	aria-labelledby=""
		// 	aria-describedby=""
		// >
		// 	<div></div>
		// </Modal>
	);
};

export default AppModal;
