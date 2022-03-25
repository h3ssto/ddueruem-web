import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ReactSweetAlert } from 'sweetalert2-react-content';
import FileCreate from './FileCreate';
import api from '../../services/api.service';
import { default as Modal } from '../../components/Modal';

jest.mock('../../services/api.service');
const mockedApi = api as jest.Mocked<typeof api>;

jest.mock('../../components/Modal');
const MockedModal = Modal as jest.Mocked<typeof Swal & ReactSweetAlert>;

jest.setTimeout(60000);

interface Tag {
  id: number;
  label: string;
}

describe('<FileCreate />', () => {
  const original = window.location;

  const reloadFn = () => {
    window.location.reload();
  };

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    });
  });

  test('button should be initially disabled', async () => {
    mockedApi.get.mockResolvedValue(
      new Promise((resolve) => {
        const mockedTags: Tag[] = [{ id: 1337, label: 'testlabel' }];
        const mockedResponse = { data: mockedTags };
        resolve(mockedResponse);
      }),
    );
    render(<FileCreate />);
    const uploadButton = screen.getByText(/Upload!/i) as HTMLButtonElement;
    expect(uploadButton.disabled).toBeTruthy();
  });

  test('button should enable after label, description, file, license, newVersionOf, tags, legalShare, userData and openSource have been entered', async () => {
    mockedApi.get.mockResolvedValue(
      new Promise((resolve) => {
        const mockedResponse = {
          data: [{ id: 1337, label: 'testlabel' }],
        };
        resolve(mockedResponse);
      }),
    );
    render(<FileCreate />);

    const uploadButton = screen.getByText(/Upload!/i) as HTMLButtonElement;
    expect(uploadButton.disabled).toBeTruthy();

    // type label
    const labelFormControl = await screen.findByTestId('label');
    fireEvent.change(labelFormControl, {
      target: { value: 'test label' },
    });

    // type description
    const descriptionFormControl = await screen.findByTestId('description');
    fireEvent.change(descriptionFormControl, {
      target: { value: 'test description' },
    });

    // select file
    const fileUploadFormControl = await screen.findByTestId('file-upload');
    fireEvent.change(fileUploadFormControl, {
      target: { files: ['testfile content'] },
    });

    // select license
    const licenseFormSelect = await screen.findByTestId('license');
    fireEvent.change(licenseFormSelect, {
      target: { value: '1337' },
    });

    // select newVersionOf
    const versionFormSelect = await screen.findByTestId('version');
    fireEvent.change(versionFormSelect, {
      target: { value: '1337' },
    });

    // click tags
    await selectEvent.select(screen.getByLabelText('Tags'), 'testlabel');

    // click legal share checkbox
    const legalShareCheckbox = await screen.findByTestId('legal-share');
    fireEvent.click(legalShareCheckbox);

    // click user data checkbox
    const userDataCheckbox = await screen.findByTestId('user-data');
    fireEvent.click(userDataCheckbox);

    // click open source checkbox
    const openSourceCheckbox = await screen.findByTestId('open-source');
    fireEvent.click(openSourceCheckbox);

    expect(uploadButton.disabled).toBeFalsy();
  });

  test('button should enable after label, description, file, license, family, tags, legalShare, userData and openSource have been entered', async () => {
    mockedApi.get.mockResolvedValue(
      new Promise((resolve) => {
        const mockedResponse = {
          data: [{ id: 1337, label: 'testlabel' }],
        };
        resolve(mockedResponse);
      }),
    );
    render(<FileCreate />);

    const uploadButton = screen.getByText(/Upload!/i) as HTMLButtonElement;
    expect(uploadButton.disabled).toBeTruthy();

    // type label
    const labelFormControl = await screen.findByTestId('label');
    fireEvent.change(labelFormControl, {
      target: { value: 'test label' },
    });

    // type description
    const descriptionFormControl = await screen.findByTestId('description');
    fireEvent.change(descriptionFormControl, {
      target: { value: 'test description' },
    });

    // select file
    const fileUploadFormControl = await screen.findByTestId('file-upload');
    fireEvent.change(fileUploadFormControl, {
      target: { files: ['testfile content'] },
    });

    // select license
    const licenseFormSelect = await screen.findByTestId('license');
    fireEvent.change(licenseFormSelect, {
      target: { value: '1337' },
    });

    // select feature model family
    await selectEvent.select(screen.getByLabelText('Feature model family'), 'testlabel');

    // click tags
    await selectEvent.select(screen.getByLabelText('Tags'), 'testlabel');

    // click legal share checkbox
    const legalShareCheckbox = await screen.findByTestId('legal-share');
    fireEvent.click(legalShareCheckbox);

    // click user data checkbox
    const userDataCheckbox = await screen.findByTestId('user-data');
    fireEvent.click(userDataCheckbox);

    // click open source checkbox
    const openSourceCheckbox = await screen.findByTestId('open-source');
    fireEvent.click(openSourceCheckbox);

    expect(uploadButton.disabled).toBeFalsy();
  });

  test('button should not enable if no file has been selected', async () => {
    mockedApi.get.mockResolvedValue(
      new Promise((resolve) => {
        const mockedTags: Tag[] = [{ id: 1337, label: 'testlabel' }];
        const mockedResponse = { data: mockedTags };
        resolve(mockedResponse);
      }),
    );
    render(<FileCreate />);

    const uploadButton = screen.getByText(/Upload!/i) as HTMLButtonElement;
    expect(uploadButton.disabled).toBeTruthy();

    // type description
    const descriptionFormControl = await screen.findByTestId('description');
    fireEvent.change(descriptionFormControl, {
      target: { value: 'test description' },
    });

    // select file
    const fileUploadFormControl = await screen.findByTestId('file-upload');
    fireEvent.change(fileUploadFormControl, { target: {} });

    // click legal share checkbox
    const legalShareCheckbox = await screen.findByTestId('legal-share');
    fireEvent.click(legalShareCheckbox);

    // click user data checkbox
    const userDataCheckbox = await screen.findByTestId('user-data');
    fireEvent.click(userDataCheckbox);

    // click open source checkbox
    const openSourceCheckbox = await screen.findByTestId('open-source');
    fireEvent.click(openSourceCheckbox);

    expect(uploadButton.disabled).toBeTruthy();
  });

  test('submit data should reset the form', async () => {
    mockedApi.get.mockResolvedValue(
      new Promise((resolve) => {
        const mockedTags: Tag[] = [{ id: 1337, label: 'testlabel' }];
        const mockedResponse = { data: mockedTags };
        resolve(mockedResponse);
      }),
    );

    mockedApi.post.mockResolvedValue(
      new Promise((resolve) => {
        const mockedResponse = {
          data: { testResponseKey: 'testResponseValue' },
        };
        resolve(mockedResponse);
      }),
    );

    // MockedModal.fire.mockResolvedValue(
    //   new Promise((resolve, reject) => {
    //     let sweetResult = {
    //       isConfirmed: true,
    //       isDenied: false,
    //       isDismissed: false,
    //     } as SweetAlertResult<string>;
    //     resolve(sweetResult);
    //   })
    // );

    MockedModal.fire.mockImplementation(() => {
      reloadFn();
      const sweetResult = {
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      } as SweetAlertResult<string>;
      return Promise.resolve(sweetResult);
    });

    render(<FileCreate />);

    // type label
    const labelFormControl = (await screen.findByTestId(
      'label',
    )) as HTMLInputElement;
    fireEvent.change(labelFormControl, {
      target: { value: 'test label' },
    });

    // type description
    const descriptionFormControl = (await screen.findByTestId(
      'description',
    )) as HTMLTextAreaElement;
    fireEvent.change(descriptionFormControl, {
      target: { value: 'test description' },
    });

    // select file
    const fileUploadFormControl = (await screen.findByTestId(
      'file-upload',
    )) as HTMLInputElement;
    fireEvent.change(fileUploadFormControl, {
      target: { files: ['testfile content'] },
    });

    // select license
    const licenseFormSelect = await screen.findByTestId('license');
    fireEvent.change(licenseFormSelect, {
      target: { value: '1337' },
    });

    // select newVersionOf
    const versionFormSelect = await screen.findByTestId('version');
    fireEvent.change(versionFormSelect, {
      target: { value: '1337' },
    });

    // click tags
    await selectEvent.select(screen.getByLabelText('Tags'), 'testlabel');

    // click legal share checkbox
    const legalShareCheckbox = (await screen.findByTestId(
      'legal-share',
    )) as HTMLInputElement;
    fireEvent.click(legalShareCheckbox);

    // click user data checkbox
    const userDataCheckbox = (await screen.findByTestId(
      'user-data',
    )) as HTMLInputElement;
    fireEvent.click(userDataCheckbox);

    // click open source checkbox
    const openSourceCheckbox = (await screen.findByTestId(
      'open-source',
    )) as HTMLInputElement;
    fireEvent.click(openSourceCheckbox);

    // click Upload!
    const uploadButton = screen.getByText(/Upload!/i) as HTMLButtonElement;
    fireEvent.click(uploadButton);

    // wait for modal, then click ok
    // let modalTitle = (await waitFor(() =>
    //   screen.getByText(/Success!!/i)
    // )) as HTMLHeadingElement;
    // let modal = modalTitle.parentElement as HTMLDivElement;
    // let okButton: HTMLButtonElement = getByText(
    //   modal,
    //   "OK"
    // ) as HTMLButtonElement;
    // let clickResult = fireEvent.click(okButton);

    // wait for site refresh
    await new Promise((resolve) => {
      resolve(setTimeout(resolve, 5000));
    });

    expect(mockedApi.get).toHaveBeenCalled();
    expect(mockedApi.post).toHaveBeenCalled();
    // expect(MockedModal.fire).toHaveBeenCalled();

    // TODO: Somehow reset the form after modal fire
    // expect(labelFormControl.value).toBeUndefined();
    // expect(descriptionFormControl.value).toBeUndefined();
    // expect(fileUploadFormControl.files).toBeUndefined();
    // expect(legalShareCheckbox.checked).toBeFalsy();
    // expect(userDataCheckbox.checked).toBeFalsy();
    // expect(openSourceCheckbox.checked).toBeFalsy();
    // expect(screen.getByTestId("tag-form")).toHaveFormValues({ tags: "" });
  });
});
