import { Create, SimpleForm, TextInput, required } from "react-admin";

const CourseCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="title" validate={[required()]} label="title" />
				<TextInput source="imageSrc" validate={[required()]} label="imageSrc" />
			</SimpleForm>
		</Create>
	);
};

export default CourseCreate;
