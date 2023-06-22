import { styled } from '../../stitches.config';
import {
  Form,
  Label,
  Input,
  TextArea,
  Button,
  Select,
  Option,
} from '../common/form';
import Modal from './Modal';
import { updateBlog } from '../../utils/blogsApi';
import { IBlogData } from '../../types/IBlog';
import { ChangeEvent, useState } from 'react';

const ButtonContainer = styled('div', {
  width: '100%',
  display: 'flex',
  gap: '0.5rem',

  '& button': {
    flexGrow: 1,
  },
});

const BodyLabelContainer = styled('div', {
  marginBottom: '0.5em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface Props {
  id: IBlogData['_id'];
  title: IBlogData['title'];
  snippet: IBlogData['snippet'];
  body: IBlogData['body'];
  format: IBlogData['format'];
  onCancel: () => void;
}

const EditBlog = ({ id, title, snippet, body, format, onCancel }: Props) => {
  const [inputTitle, setInputTitle] = useState(title);
  const [inputSnippet, setInputSnippet] = useState(snippet);
  const [inputBody, setInputBody] = useState(body);
  const [selectedFormat, setSelectedFormat] = useState(format);
  const [isSaving, setIsSaving] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const showModalEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsShowModalEdit(true);
  };

  const hideModalEdit = () => {
    setIsShowModalEdit(false);
  };

  const handleSave = async () => {
    setIsShowModalEdit(false);

    try {
      setIsSaving(true);

      const data = await updateBlog(
        id,
        inputTitle,
        inputSnippet,
        inputBody,
        selectedFormat
      );

      if (data?.error) throw data.error;

      setIsSaving(false);
      onCancel();
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(e.target.value as IBlogData['format']);
  };

  return (
    <>
      <Modal
        show={isShowModalEdit}
        message="Are you sure you want to save?"
        btnText="Save"
        onConfirm={() => handleSave()}
        onCancel={hideModalEdit}
        btnColor="secondary"
      />

      <Form onSubmit={showModalEdit}>
        <Label htmlFor="form-title" mb0_5>
          Title
        </Label>
        <Input
          id="form-title"
          defaultValue={title}
          onChange={(e) => setInputTitle(e.target.value)}
          mb1
        />

        <Label htmlFor="form-snippet" mb0_5>
          Snippet
        </Label>
        <Input
          id="form-snippet"
          defaultValue={snippet}
          onChange={(e) => setInputSnippet(e.target.value)}
          mb1
        />

        <BodyLabelContainer>
          <Label htmlFor="form-body">Body</Label>

          <Select value={selectedFormat} onChange={handleSelectChange}>
            <Option value="markdown">Markdown</Option>
          </Select>
        </BodyLabelContainer>
        <TextArea
          id="form-body"
          defaultValue={body}
          onChange={(e) => setInputBody(e.target.value)}
          mb1
        />

        <ButtonContainer>
          <Button type="submit" disabled={isSaving}>
            {!isSaving ? 'Save' : 'Saving...'}
          </Button>
          <Button type="button" color="outline" onClick={onCancel}>
            Cancel
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default EditBlog;
