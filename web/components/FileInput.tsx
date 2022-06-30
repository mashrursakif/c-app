import React from 'react';
import { Grid } from '@mui/material';

interface Props {
	imageName?: string;
	handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const FileInput = ({ imageName, handleChange }: Props) => {
	return (
		<Grid container justifyContent="flex-start" alignItems="cener">
			{/*<label htmlFor="image-input" className="">
			<Grid item className="image-input-label">
					{imageName || 'Choose File'}
					<input type="file" id="image-input" onChange={handleChange} />
			</Grid>
			<Grid item className="image-input-button">
				<label>Browse</label>
			</Grid>
				</label>*/}
		</Grid>
	);
};

export default FileInput;
