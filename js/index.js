(() => {
  let options = [
    {
      code: 'phone',
      title: 'Телефон',
    },
    {
      code: 'email',
      title: 'E-mail',
    },
    {
      code: 'vk',
      title: 'Vk',
    },
    {
      code: 'facebook',
      title: 'Facebook',
    },
    {
      code: 'other',
      title: 'Другое',
    },
  ];

  const clientsAddBtn = document.querySelector('.clients-add__btn');
  const modal = document.getElementById('modal');
  const modalCloseBtn = document.querySelectorAll('.modal-close__btn');
  const newclientModal = document.querySelector('.newclient-modal');
  const newclientModalContacts = document.querySelector(
    '.newclient-modal-contacts'
  );
  const newclientModalContactsWrap = document.querySelector(
    '.newclient-modal-contacts__wrap'
  );
  let pagePosition = window.scrollY;

  function getContacts(container) {
    const contactList = [];
    const newclientModalContactWraps = container.querySelectorAll(
      '.newclient-modal-contact__wrap'
    );
    for (const item of newclientModalContactWraps) {
      const contact = {};
      const select = item.querySelector('span');
      contact.type = select.textContent;
      contact.value = item.querySelector('input').value;
      contactList.push(contact);
    }
    return contactList;
  }

  function getContactsCount(container) {
    const newclientModalContactWraps = container.querySelectorAll(
      '.newclient-modal-contact__wrap'
    );
    return newclientModalContactWraps.length;
  }

  function createContact(contact) {
    const newclientModalContactWrap = document.createElement('div');
    newclientModalContactWrap.classList.add('newclient-modal-contact__wrap');
    const newclientModalContactSelect = document.createElement('div');
    newclientModalContactSelect.classList.add(
      'newclient-modal-contact__select'
    );
    const newclientModalContactName = document.createElement('span');
    newclientModalContactName.classList.add(
      'newclient-modal-contact__descr',
      'newclient-modal-contact__icon'
    );
    newclientModalContactName.setAttribute('tabindex', '0');
    const newclientContactOptionWrap = document.createElement('div');
    newclientContactOptionWrap.classList.add('newclient-contact-option__wrap');
    newclientModalContactSelect.append(newclientModalContactName);
    newclientModalContactSelect.append(newclientContactOptionWrap);
    const contactLabel = [];
    options.forEach((option) => {
      const newclientContactOption = document.createElement('label');
      newclientContactOption.classList.add(
        'newclient-contact__option',
        'modal__option'
      );
      newclientContactOption.textContent = option.title;
      contactLabel.push(newclientContactOption);

      if (contact.type === option.title) {
        newclientModalContactName.textContent = option.title;
        newclientContactOption.classList.add('hidden');
        newclientModalContactName.setAttribute('data-save', option.code);
      }

      newclientContactOptionWrap.append(newclientContactOption);
      newclientContactOption.setAttribute('data-save', option.code);

      createModalContactsDropdown(
        newclientModalContactName,
        newclientModalContactSelect,
        contactLabel,
        'data-save'
      );

      newclientContactOptionWrap.addEventListener('mouseleave', () => {
        newclientModalContactSelect.classList.remove('is-active');
      });
    });

    function createModalContactsDropdown(
      contactName,
      contactSelect,
      contactLabel,
      data
    ) {
      if (contactName !== undefined) {
        function openDropdown() {
          const newclientContactOptions = document.querySelectorAll(
            '.newclient-contact__option'
          );
          const isActive = !contactSelect.classList.contains('is-active');
          document
            .querySelectorAll(
              '.newclient-modal-contact__wrap > .newclient-modal-contact__select'
            )
            .forEach((wrapper) => {
              wrapper.classList.remove('is-active');
            });
          if (isActive) {
            contactSelect.classList.add('is-active');
            newclientContactOptions.forEach((option) => {
              option.setAttribute('tabindex', '0');
            });
          } else {
            newclientContactOptions.forEach((option) => {
              option.removeAttribute('tabindex', '0');
            });
          }
          for (let i = 0; i < contactLabel.length; i++) {
            contactLabel[i].addEventListener('click', (evt) => {
              contactName.textContent = evt.target.textContent;
              contactName.setAttribute(data, evt.target.getAttribute(data));
              const hidden = document.querySelectorAll('.hidden');
              for (const option of hidden) {
                option.classList.remove('hidden');
              }
              evt.target.classList.add('hidden');
              contactSelect.classList.remove('is-active');
            });
          }

          const newclientModalContactInputs = document.querySelectorAll(
            '.newclient-modal-contact__input'
          );

          newclientModalContactInputs.forEach((input) => {
            input.addEventListener('focus', () => {
              newclientModalContactSelect.classList.remove('is-active');
              newclientContactOptions.forEach((option) => {
                option.removeAttribute('tabindex', '0');
              });
            });
          });
        }
        contactName.addEventListener('click', openDropdown);
        contactName.addEventListener('keypress', openDropdown);
      }
    }

    const newclientModalContactInput = document.createElement('input');
    newclientModalContactInput.classList.add('newclient-modal-contact__input');
    newclientModalContactInput.value = contact.value;
    const newclientModalContactDeleteBtn = document.createElement('button');
    newclientModalContactDeleteBtn.classList.add(
      'newclient-modal-contact-delete__btn'
    );

    newclientModalContactDeleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      newclientModalContactWrap.remove();
      const contactsCount = getContactsCount(newclientModalContacts) + 1;
      console.log(contactsCount);
      if (contactsCount <= 1) {
        newclientModalContactsWrap.classList.remove('is-active');
      }
      if (contactsCount <= 5) {
        newclientModalContacts.classList.remove('overflow');
      }
      newclientModalAddBtn.forEach((addBtn) => {
        if (contactsCount <= 10) {
          addBtn.classList.add('is-active');
          clientModalValidation.classList.remove('is-active');
        }
      });
    });

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip-modal');
    const innerTooltipContacts = document.createElement('div');
    innerTooltipContacts.classList.add('clients-inner-contact');
    innerTooltipContacts.append(tooltip);
    tooltip.innerHTML = `Удалить контакт`;
    newclientModalContactDeleteBtn.append(innerTooltipContacts);

    newclientModalContactWrap.append(newclientModalContactSelect);
    newclientModalContactWrap.append(newclientModalContactInput);
    newclientModalContactWrap.append(newclientModalContactDeleteBtn);

    return {
      newclientModalContactWrap,
      newclientModalContactName,
      newclientModalContactInput,
      newclientModalContactDeleteBtn,
    };
  }

  function upperFirstLetter(str) {
    if (str == '') return str;
    let strFirst = str.toLowerCase().trim();
    let strSecond = strFirst[0].toUpperCase() + strFirst.slice(1);
    return strSecond;
  }

  const clientsSection = document.querySelector('.clients');

  function openModal() {
    clientsSection.setAttribute('inert', '');
    modal.classList.add('is-active');
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
    const rows = tableBody.querySelectorAll('tr');
    const newRows = Array.from(rows);
    newRows.forEach((row) => {
      row.classList.remove('sublight');
    });
    newclientModalAddBtn.forEach((addBtn) => {
      addBtn.classList.add('is-active');
    });
  }

  function closeModal() {
    clientsSection.removeAttribute('inert', '');
    newclientModal.classList.remove('is-active');
    deleteclientModal.classList.remove('is-active');
    modal.classList.remove('is-active');
    clientModalIdSubtitle.classList.remove('is-active');
    document.body.classList.remove('disable-scroll');
    deleteclientModalCancelBtn.forEach((cancelBtn) => {
      cancelBtn.classList.remove('is-active');
    });
    newclientModalDeleteBtn.classList.remove('is-active');
    newclientModalSaveBtn.classList.remove('is-active');
    changeclientModalSaveBtn.classList.remove('is-active');
    newclientModalContacts.textContent = '';
    newclientModalContacts.classList.remove('overflow');
    newclientModalContactsWrap.classList.remove('is-active');
    clientModalValidation.classList.remove('is-active');
    clientModalValidation.textContent = '';
    changeclientModalSaveBtn.removeAttribute('disabled', 'true');
    newclientModalSaveBtn.removeAttribute('disabled', 'true');
    clientCardIdSubtitle.classList.remove('is-active');
    newclientModalAddBtn.forEach((addBtn) => {
      addBtn.classList.remove('is-active');
    });

    const newclientModalInputs = document.querySelectorAll(
      '.newclient-modal__input'
    );

    newclientModalInputs.forEach((input) => {
      input.removeAttribute('readonly');
    });

    const newclientModalInputLabels = document.querySelectorAll(
      '.modal-input__label'
    );

    newclientModalInputLabels.forEach((label) => {
      label.classList.remove('is-static-label');
    });
    inputWrapperName.classList.remove('is-active');
    inputWrapperSurname.classList.remove('is-active');
    inputWrapperSurname.classList.remove('invalid');
    inputWrapperName.classList.remove('invalid');
    clientModalValidation.classList.remove('is-active');
    clientModalValidation.textContent = '';
    errorsModal.classList.remove('is-active');
    errorsModalTitle.textContent = '';
    errorsModalDescr.textContent = '';
    location.hash = '';
    clearInput();
  }

  modalCloseBtn.forEach((closeBtn) => {
    closeBtn.addEventListener('click', (e) => {
      closeModal();
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });

  function clearInput() {
    for (let i = 0; i < newclientModalInput.length; i++) {
      newclientModalInput[i].value = '';
    }
  }

  const errorsModal = document.querySelector('.errors');
  const errorsModalTitle = document.querySelector('.errors__title');
  const errorsModalDescr = document.querySelector('.errors__descr');

  function errors404() {
    errorsModal.classList.add('is-active');
    errorsModalTitle.textContent = '404';
    errorsModalDescr.textContent =
      'Переданный в запросе метод не существует или запрашиваемый элемент не найден в базе данных';
  }

  function errors500() {
    errorsModal.classList.add('is-active');
    errorsModalTitle.textContent = '500';
    errorsModalDescr.textContent = 'Cтранно, но сервер сломался :(';
  }

  function addFindErrors(data) {
    data.then(({ data, status }) => {
      switch (status) {
        case 200:
        case 201:
          createTableString(data);
          break;
        case 404:
          errors404();
          break;
        case 500:
          errors500();
          break;
        case 422:
          break;
        default:
          return;
      }
    });

    if (newclientName.value !== '' && newclientSurname.value !== '') {
      closeModal();
    }
  }

  function deleteFindErrors(data) {
    data.then(({ data, status }) => {
      switch (status) {
        case 200:
        case 201:
          closeModal();
          break;
        case 404:
          errors404();
          break;
        case 500:
          errors500();
          break;
        default:
          return;
      }
    });
  }

  const newclientSurname = document.querySelector('.newclient-surname');
  const newclientName = document.querySelector('.newclient-name');
  const newclientMiddlename = document.querySelector('.newclient-middlename');
  const deleteclientModalCancelBtn = document.querySelectorAll(
    '.deleteclient-modal-cancel__btn'
  );
  const newclientModalDeleteBtn = document.querySelector(
    '.newclient-modal-delete__btn'
  );
  const newclientModalForm = document.querySelector('.newclient-modal__form');
  const newclientModalInput = newclientModalForm.getElementsByClassName(
    'newclient-modal__input'
  );
  const newclientModalSaveBtn = document.querySelector(
    '.newclient-modal-save__btn'
  );
  const changeclientModalSaveBtn = document.querySelector(
    '.changeclient-modal-save__btn'
  );
  const newclientModalTitle = document.querySelector('.newclient-modal__title');
  const clientModalIdSubtitle = document.querySelector(
    '.client-modal-id__subtitle'
  );
  const clientCardIdSubtitle = document.querySelector(
    '.client-card-id__subtitle'
  );

  function createContactCards(contact) {
    const clientCardContactWrap = document.createElement('div');
    clientCardContactWrap.classList.add('client-card-contact__wrap');
    const clientCardContactDescr = document.createElement('div');
    clientCardContactDescr.classList.add('client-card-contact__descr');
    const clientCardContactInput = document.createElement('div');

    clientCardContactInput.classList.add('client-card-contact__input');
    newclientModalContacts.append(clientCardContactWrap);
    clientCardContactWrap.append(
      clientCardContactDescr,
      clientCardContactInput
    );
    if (contact) {
      clientCardContactDescr.textContent = contact.type;
      clientCardContactInput.textContent = contact.value;
    }
    return newclientModalContacts;
  }

  clientsAddBtn.addEventListener('click', () => {
    openModal();
    newclientModal.classList.add('is-active');
    newclientModalSaveBtn.classList.add('is-active');
    clientModalValidation.classList.remove('is-active');
    deleteclientModalCancelBtn.forEach((cancelBtn) => {
      cancelBtn.classList.add('is-active');
      cancelBtn.addEventListener('click', () => {
        closeModal();
      });
    });
    newclientModalTitle.textContent = 'Новый клиент';
  });

  const newclientModalAddBtn = document.querySelectorAll(
    '.newclient-modal-add__btn'
  );
  const clientModalValidation = document.querySelector(
    '.client-modal-validation'
  );

  newclientModalAddBtn.forEach((addBtn) => {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactsCount = getContactsCount(newclientModalContacts) + 1;
      const result = createContact({
        type: 'Телефон',
        code: '',
        title: '',
        value: '',
      });

      if (contactsCount >= 1) {
        newclientModalContactsWrap.classList.add('is-active');
      } else {
        newclientModalContactsWrap.classList.remove('is-active');
      }
      if (contactsCount >= 5) {
        newclientModalContacts.classList.add('overflow');
      }
      if (contactsCount <= 10) {
        addBtn.classList.add('is-active');
        newclientModalContacts.prepend(result.newclientModalContactWrap);
      } else {
        addBtn.classList.remove('is-active');
        clientModalValidation.classList.add('is-active');
        clientModalValidation.textContent =
          'Можно добавить только 10 контактов!';
      }
    });
  });

  const inputWrapperSurname = document.querySelector('.modal-input-surname');
  const inputWrapperName = document.querySelector('.modal-input-name');
  const inputWrapperMiddlename = document.querySelector(
    '.modal-input-middlename'
  );
  const inputSurname = document.querySelector('.surname');
  const inputName = document.querySelector('.name');
  const inputMiddlename = document.querySelector('.middlename');
  const surnameFail = document.createElement('span');
  const nameFail = document.createElement('span');
  const landFail = document.createElement('span');

  newclientModalSaveBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const contacts = getContacts(newclientModalContacts);
    const notEmptyContacts = contacts.filter((contact) => contact.value !== '');

    if (
      validateNewclientForm(
        inputWrapperSurname,
        inputWrapperName,
        inputWrapperMiddlename,
        inputSurname,
        inputName,
        inputMiddlename
      ) === true
    ) {
      inputWrapperSurname.classList.remove('is-active');
      inputWrapperName.classList.remove('is-active');
      clientModalValidation.classList.remove('is-active');
      clientModalValidation.textContent = '';

      const data = createClient(
        upperFirstLetter(newclientName.value),
        upperFirstLetter(newclientSurname.value),
        upperFirstLetter(newclientMiddlename.value),
        notEmptyContacts
      );
      addFindErrors(data);
    }
  });

  surnameFail.textContent = 'Введите Фамилию';
  nameFail.textContent = 'Введите Имя';
  landFail.textContent = 'только Руский язык';

  function validateNewclientForm(
    surnameWrap,
    nameWrap,
    middlenameWrap,
    surname,
    name,
    middlename
  ) {
    if (surname.value === '' && name.value === '') {
      surnameWrap.classList.add('invalid');
      nameWrap.classList.add('invalid');
      clientModalValidation.classList.add('is-active');
      clientModalValidation.append(surnameFail, nameFail);

      changeclientModalSaveBtn.setAttribute('disabled', 'true');
      newclientModalSaveBtn.setAttribute('disabled', 'true');

      landFail.remove();
    } else if (surname.value === '') {
      surnameWrap.classList.add('invalid');
      clientModalValidation.classList.add('is-active');
      clientModalValidation.append(surnameFail);

      changeclientModalSaveBtn.setAttribute('disabled', 'true');
      newclientModalSaveBtn.setAttribute('disabled', 'true');

      landFail.remove();
    } else if (
      !surname.value.trim().match(/^[А-Яа-я]+$/) &&
      surname.value !== ''
    ) {
      surnameWrap.classList.add('invalid');
      clientModalValidation.classList.add('is-active');
      clientModalValidation.append(landFail);

      changeclientModalSaveBtn.setAttribute('disabled', 'true');
      newclientModalSaveBtn.setAttribute('disabled', 'true');

      surnameFail.remove();
    } else if (name.value === '') {
      nameWrap.classList.add('invalid');
      clientModalValidation.classList.add('is-active');
      clientModalValidation.append(nameFail);

      changeclientModalSaveBtn.setAttribute('disabled', 'true');
      newclientModalSaveBtn.setAttribute('disabled', 'true');

      landFail.remove();
    } else if (!name.value.trim().match(/^[А-Яа-я]+$/) && name.value !== '') {
      nameWrap.classList.add('invalid');
      clientModalValidation.classList.add('is-active');
      nameFail.remove();

      changeclientModalSaveBtn.setAttribute('disabled', 'true');
      newclientModalSaveBtn.setAttribute('disabled', 'true');

      clientModalValidation.append(landFail);
    } else {
      clientModalValidation.classList.remove('is-active');
      surnameWrap.classList.remove('invalid');
      nameWrap.classList.remove('invalid');

      changeclientModalSaveBtn.removeAttribute('disabled', 'true');
      newclientModalSaveBtn.removeAttribute('disabled', 'true');

      surnameFail.remove();
      nameFail.remove();
      landFail.remove();
      return true;
    }

    surname.addEventListener('input', () => {
      if (surname.value === '') {
        surnameWrap.classList.add('invalid');
        clientModalValidation.classList.add('is-active');
        clientModalValidation.prepend(surnameFail);

        changeclientModalSaveBtn.setAttribute('disabled', 'true');
        newclientModalSaveBtn.setAttribute('disabled', 'true');

        landFail.remove();
      } else if (
        !surname.value.trim().match(/^[А-Яа-я]+$/) &&
        surname.value !== ''
      ) {
        surnameWrap.classList.add('invalid');
        clientModalValidation.classList.add('is-active');
        surnameFail.remove();

        changeclientModalSaveBtn.setAttribute('disabled', 'true');
        newclientModalSaveBtn.setAttribute('disabled', 'true');

        clientModalValidation.append(landFail);
      } else {
        clientModalValidation.classList.remove('is-active');
        surnameFail.remove();
        landFail.remove();

        changeclientModalSaveBtn.removeAttribute('disabled', 'true');
        newclientModalSaveBtn.removeAttribute('disabled', 'true');

        surnameWrap.classList.remove('invalid');
        return true;
      }
    });

    name.addEventListener('input', () => {
      if (name.value === '') {
        nameWrap.classList.add('invalid');
        clientModalValidation.classList.add('is-active');
        clientModalValidation.append(nameFail);

        changeclientModalSaveBtn.setAttribute('disabled', 'true');
        newclientModalSaveBtn.setAttribute('disabled', 'true');

        landFail.remove();
      } else if (!name.value.trim().match(/^[А-Яа-я]+$/) && name.value !== '') {
        nameWrap.classList.add('invalid');
        clientModalValidation.classList.add('is-active');
        nameFail.remove();

        changeclientModalSaveBtn.setAttribute('disabled', 'true');
        newclientModalSaveBtn.setAttribute('disabled', 'true');

        clientModalValidation.append(landFail);
      } else {
        clientModalValidation.classList.remove('is-active');
        nameWrap.classList.remove('invalid');

        changeclientModalSaveBtn.removeAttribute('disabled', 'true');
        newclientModalSaveBtn.removeAttribute('disabled', 'true');

        nameFail.remove();
        landFail.remove();
        return true;
      }
    });

    middlename.addEventListener('input', () => {
      if (
        !middlename.value.trim().match(/^[А-Яа-я]+$/) &&
        middlename.value !== ''
      ) {
        middlenameWrap.classList.add('invalid');
        clientModalValidation.classList.add('is-active');
        clientModalValidation.append(landFail);

        changeclientModalSaveBtn.setAttribute('disabled', 'true');
        newclientModalSaveBtn.setAttribute('disabled', 'true');
      } else {
        clientModalValidation.classList.remove('is-active');
        middlenameWrap.classList.remove('invalid');

        changeclientModalSaveBtn.removeAttribute('disabled', 'true');
        newclientModalSaveBtn.removeAttribute('disabled', 'true');

        landFail.remove();
        return true;
      }
    });
  }

  const deleteclientModal = document.querySelector('.deleteclient-modal');
  const deleteclientBtn = document.querySelector(
    '.deleteclient-modal-delete__btn'
  );
  const table = document.getElementById('sortable');
  const tableBody = table.querySelector('tbody');
  const headers = table.querySelectorAll('th');

  tableBody.append(createPreloader());

  function deleteClientModal(id) {
    openModal();
    deleteclientModal.classList.add('is-active');
    deleteclientModalCancelBtn.forEach((cancelBtn) => {
      cancelBtn.classList.add('is-active');
      cancelBtn.addEventListener('click', (e) => {
        closeModal();
      });
    });

    let tableString = document.getElementById(id);

    const handleDelete = () => {
      deleteFindErrors(deleteClient(id));
      deleteclientBtn.removeEventListener('click', () => {
        handleDelete();
      });
    };
    deleteclientBtn.addEventListener('click', () => {
      handleDelete();
      tableString.remove();
      closeModal();
    });
  }

  async function changeClientModal(id) {
    openModal();
    newclientModal.classList.add('is-active');
    newclientModalTitle.textContent = 'Изменить данные';
    clientModalIdSubtitle.classList.add('is-active');
    changeclientModalSaveBtn.classList.add('is-active');
    newclientModalDeleteBtn.classList.add('is-active');
    let tableString = document.getElementById(id);

    newclientModalDeleteBtn.addEventListener('click', () => {
      deleteFindErrors(deleteClient(id));
      tableString.remove();
    });

    await searchClientsId(id).then((response) => {
      const { data, status } = response;
      switch (status) {
        case 200:
        case 201:
          if (data.contacts.length >= 5) {
            newclientModalContacts.classList.add('overflow');
          }
          clientModalIdSubtitle.textContent = `ID: ${data.id}`;
          clientModalIdSubtitle.setAttribute('data-id', data.id);
          newclientSurname.value = data.surname;
          newclientName.value = data.name;
          newclientMiddlename.value = data.middlename;
          break;
        case 404:
          errors404();
          makeTable();
          break;
        case 500:
          errors500();
          makeTable();
          break;
        default:
          return;
      }
    });
  }

  function changeClientData(clientContacts) {
    newclientModalContacts.textContent = '';

    if (clientContacts) {
      for (const clientContact of clientContacts) {
        const result = createContact(clientContact);
        newclientModalContacts.append(result.newclientModalContactWrap);
      }
    } else {
      networkErrorHandler();
      closeModal();
      makeTable();
    }
  }
  async function cardClient(id) {
    openModal();
    const newclientModalInputs = document.querySelectorAll(
      '.newclient-modal__input'
    );
    newclientModalInputs.forEach((input) => {
      input.setAttribute('readonly', true);
    });
    const newclientModalInputLabels = document.querySelectorAll(
      '.modal-input__label'
    );
    newclientModalInputLabels.forEach((label) => {
      label.classList.add('is-static-label');
    });

    newclientModal.classList.add('is-active');
    newclientModalTitle.textContent = 'Карточка клиента';
    clientCardIdSubtitle.classList.add('is-active');

    newclientModalAddBtn.forEach((addBtn) => {
      addBtn.classList.remove('is-active');
    });
    await searchClientsId(id).then((response) => {
      const { data, status } = response;

      if (data.contacts.length >= 1) {
        newclientModalContactsWrap.classList.add('is-active');
      } else {
        newclientModalContactsWrap.classList.remove('is-active');
      }
      switch (status) {
        case 200:
        case 201:
          for (const contact of data.contacts) {
            createContactCards(contact);
          }

          location.hash = data.id;
          clientCardIdSubtitle.textContent = `ID: ${data.id}`;
          clientCardIdSubtitle.setAttribute('data-id', data.id);
          newclientSurname.value = data.surname;
          newclientName.value = data.name;
          inputWrapperMiddlename.classList.remove('is-active');
          if (data.middlename) {
            newclientMiddlename.value = data.middlename;
          } else {
            inputWrapperMiddlename.classList.add('is-active');
          }
          break;
        case 404:
          errors404();
          makeTable();
          break;
        case 500:
          errors500();
          makeTable();
          break;
        default:
          return;
      }
    });
  }

  if (location.hash) {
    const id = location.hash.slice(1);
    cardClient(id);
  }

  changeclientModalSaveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let id = clientModalIdSubtitle.getAttribute('data-id');
    const contacts = getContacts(newclientModalContacts);
    const notEmptyContacts = contacts.filter((contact) => contact.value !== '');
    let tableString = document.getElementById(id);

    if (
      validateNewclientForm(
        inputWrapperSurname,
        inputWrapperName,
        inputWrapperMiddlename,
        inputSurname,
        inputName,
        inputMiddlename
      ) === true
    ) {
      inputWrapperSurname.classList.remove('is-active');
      inputWrapperName.classList.remove('is-active');
      clientModalValidation.classList.remove('is-active');
      clientModalValidation.textContent = '';
    }

    tableString.remove();

    addFindErrors(
      changeClient(
        id,
        upperFirstLetter(newclientName.value),
        upperFirstLetter(newclientSurname.value),
        upperFirstLetter(newclientMiddlename.value),
        notEmptyContacts
      )
    );
  });

  function tableAddImgContact(contacts) {
    const clientsInnerAllcontacts = document.createElement('div');
    clientsInnerAllcontacts.classList = 'clients-inner-allcontacts';
    let clientsInnerContactsWrap = document.createElement('div');
    clientsInnerContactsWrap.classList = 'clients-inner-contacts__wrap';
    clientsInnerAllcontacts.append(clientsInnerContactsWrap);
    let i = 0;
    for (const data of contacts) {
      const сontact = document.createElement('button');
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      const innerTooltipContacts = document.createElement('div');
      innerTooltipContacts.classList.add('clients-inner-contact');
      const link = document.createElement('a');
      const tooltipText = document.createElement('p');
      tooltipText.classList.add('tooltip__descr');
      tooltipText.textContent = data.type;
      if (data.type == 'Vk')
        link.setAttribute('href', 'https://vk.com/' + data.value);
      if (data.type == 'Телефон')
        link.setAttribute('href', 'tel:' + data.value);
      if (data.type == 'E-mail')
        link.setAttribute('href', 'mailto:' + data.value);
      if (data.type == 'Facebook')
        link.setAttribute(
          'href',
          'https://www.facebook.com/profile.php?' + data.value
        );
      if (data.type == 'Другое') link.setAttribute('href', data.value);

      link.setAttribute('target', '_blank');
      link.classList.add('tooltip__link');
      tooltip.append(tooltipText, link);
      link.textContent = data.value;
      innerTooltipContacts.append(tooltip, сontact);
      clientsInnerContactsWrap.append(innerTooltipContacts);
      if (data.type == 'Vk')
        сontact.classList.add('vk', 'clients-inner-contact__icon');
      if (data.type == 'Телефон')
        сontact.classList.add('phone', 'clients-inner-contact__icon');
      if (data.type == 'E-mail')
        сontact.classList.add('mail', 'clients-inner-contact__icon');
      if (data.type == 'Facebook')
        сontact.classList.add('fb', 'clients-inner-contact__icon');
      if (data.type == 'Другое')
        сontact.classList.add('other', 'clients-inner-contact__icon');

      сontact.addEventListener('click', () => {
        const isActive = !tooltip.classList.contains('is-active');
        document
          .querySelectorAll('.clients-inner-contact > .tooltip')
          .forEach((tooltip) => {
            tooltip.classList.remove('is-active');
          });
        if (isActive) {
          tooltip.classList.add('is-active');
        }
      });
      window.addEventListener('click', (e) => {
        if (e.target !== сontact) {
          tooltip.classList.remove('is-active');
        }
      });
      i++;

      if (i == 5 && contacts.length > 5) {
        const btn = document.createElement('button');
        btn.classList.add('fullcontacts', 'clients-inner-contact__icon');
        btn.textContent = `+${contacts.length - 5}`;

        clientsInnerContactsWrap.append(btn);
        clientsInnerContactsWrap = document.createElement('div');
        clientsInnerContactsWrap.classList = 'clients-inner-contacts__wrap';
        clientsInnerContactsWrap.style.display = 'none';

        btn.addEventListener('click', () => {
          btn.style.display = 'none';
          clientsInnerContactsWrap.style.display = 'flex';
        });
      }
      clientsInnerAllcontacts.append(clientsInnerContactsWrap);
    }
    return clientsInnerAllcontacts;
    return clientsInnerContactsWrap;
  }

  function tableAddChangeClient() {
    const clientsActionBtns = document.createElement('div');
    const clientsChangeIcon = document.createElement('div');
    const clientsChangeBtn = document.createElement('button');

    clientsActionBtns.append(clientsChangeIcon, clientsChangeBtn);
    clientsActionBtns.classList = 'clients-action-buttons';
    clientsChangeIcon.classList = 'clients-change__icon';
    clientsChangeBtn.classList = 'clients-change__btn';
    clientsChangeBtn.textContent = 'Изменить';

    return clientsActionBtns;
  }

  function tableAddDeleteClient() {
    const clientsActionBtns = document.createElement('div');
    const clientsDeleteIcon = document.createElement('div');
    const clientsDeleteBtn = document.createElement('button');

    clientsActionBtns.append(clientsDeleteIcon, clientsDeleteBtn);
    clientsActionBtns.classList = 'clients-action-buttons';
    clientsDeleteIcon.classList = 'clients-delete__icon';
    clientsDeleteBtn.classList = 'clients-delete__btn';
    clientsDeleteBtn.textContent = 'Удалить';

    return clientsActionBtns;
  }

  function tableRemakeTime(time) {
    const receivedData = new Date(time).toLocaleDateString();
    const receivedTime = new Date(time).toLocaleTimeString([], {
      timeStyle: 'short',
    });
    const clientsInnerDateWrap = document.createElement('div');
    const clientsInnerDate = document.createElement('div');
    const clientsInnerTime = document.createElement('div');

    clientsInnerDateWrap.classList.add('clients-inner-date__wrap');
    clientsInnerDate.classList = 'clients-inner-date__text';
    clientsInnerTime.classList = 'clients-inner-time__text';
    clientsInnerDate.textContent = receivedData;
    clientsInnerTime.textContent = receivedTime;
    clientsInnerDateWrap.append(clientsInnerDate, clientsInnerTime);

    return clientsInnerDateWrap;
  }

  function tableRemakeId(id) {
    const receivedId = document.createElement('div');
    receivedId.classList = 'clients-inner-id__text';
    receivedId.textContent = id.substring(7);
    return receivedId;
  }

  async function makeTable() {
    const tableBody = document.querySelector('.table__body');
    if (tableBody.textContent) {
      tableBody.textContent = '';
      clientsAddBtn.classList.add('is-active');
    }
    setTimeout(() => {
      fetchClients().then((response) => {
        const { data, status } = response;
        switch (status) {
          case 200:
          case 201:
            renderTable(data);
            break;
          case 404:
            errors404();
            break;
          case 500:
            errors500();
            break;
          default:
            return;
        }
      });
    }, 1000);
  }

  makeTable();

  function createPreloader() {
    const preloader = document.createElement('div');
    const preloaderIcon = document.createElement('div');
    preloaderIcon.classList.add('preloader__icon');
    preloader.classList.add('preloader');
    preloader.append(preloaderIcon);
    return preloader;
  }

  function createTableString(data) {
    const dataUpdatedAt = new Date(data.updatedAt);
    const dataCreatedAt = new Date(data.createdAt);
    const timeCreat = dataCreatedAt.getTime();
    const timeUpdate = dataUpdatedAt.getTime();
    tableAddChangeClient();

    const fullname = `${data.surname} ${data.name} ${data.middlename}`;
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    const td7 = document.createElement('td');
    const clientsInnerActionsWrap = document.createElement('div');

    const text1 = tableRemakeId(data.id);
    const text2 = document.createTextNode(fullname);
    const text3 = tableRemakeTime(data.createdAt);
    const text4 = tableRemakeTime(data.updatedAt);
    const text5 = tableAddImgContact(data.contacts);
    const text6 = tableAddChangeClient();
    const text7 = tableAddDeleteClient();

    const tr = document.createElement('tr');

    td1.append(text1);
    td1.setAttribute('data-id', data.id);

    const clientsInnerFullname = document.createElement('button');
    clientsInnerFullname.classList.add('clients-inner-fullname__text');
    clientsInnerFullname.append(text2);
    td2.append(clientsInnerFullname);
    td3.append(text3);
    td3.setAttribute('data-create', timeCreat);
    td4.append(text4);
    td4.setAttribute('data-update', timeUpdate);
    td5.append(text5);
    td5.setAttribute('data-contacts', 'contacts');
    clientsInnerActionsWrap.append(text6);
    clientsInnerActionsWrap.classList.add('clients-inner-actions__wrap');
    clientsInnerActionsWrap.append(text7);
    td6.append(clientsInnerActionsWrap);
    td2.addEventListener('click', () => {
      cardClient(data.id);
    });

    text6.addEventListener('click', () => {
      changeClientModal(data.id);
      changeClientData(data.contacts);
      if (data.contacts.length >= 1) {
        newclientModalContactsWrap.classList.add('is-active');
      } else {
        newclientModalContactsWrap.classList.remove('is-active');
      }
    });

    text7.addEventListener('click', () => {
      deleteClientModal(data.id);
    });
    tr.append(td1, td2, td3, td4, td5, td6, td7);
    tr.setAttribute('data-tr', data.id);
    tr.setAttribute('id', data.id);
    tableBody.append(tr);
    sortId();
  }

  function renderTable(contacts) {
    const tableBody = document.querySelector('.table__body');
    tableBody.textContent = '';
    clientsAddBtn.classList.remove('is-active');

    for (let data of contacts) {
      createTableString(data);
    }
  }

  headers.forEach((header, index) => {
    header.addEventListener('click', () => {
      sortColumn(index);
    });
  });

  const directions = Array.from(headers).map(() => {
    return '';
  });

  function transform(index, cell) {
    const type = headers[index].getAttribute('data-name');

    if (type === 'creation-date') {
      return cell.getAttribute('data-create');
    }
    if (type === 'last-change') {
      return cell.getAttribute('data-update');
    }
    if (type === 'id') {
      return cell.getAttribute('data-id');
    }
    if (type === 'contacts') {
      return cell.getAttribute('data-contacts');
    } else {
      return cell.textContent;
    }
  }

  const thTitle = document.querySelectorAll('.table-header');
  thTitle.forEach((title) => {
    title.addEventListener('click', () => {
      title.classList.toggle('is-active');
    });
  });

  function sortId() {
    const rows = tableBody.querySelectorAll('tr');
    const newRows = Array.from(rows);
    newRows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll('td')[0];
      const cellB = rowB.querySelectorAll('td')[0];
      const a = cellA.getAttribute('data-id');
      const b = cellB.getAttribute('data-id');
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      if (a === b) {
        return 0;
      }
    });
    rows.forEach((row) => {
      tableBody.removeChild(row);
    });

    newRows.forEach((newRow) => {
      tableBody.appendChild(newRow);
    });
  }

  function sortColumn(index) {
    const rows = tableBody.querySelectorAll('tr');
    const direction = directions[index] || 'desc';
    const multiplier = direction === 'desc' ? -1 : 1;
    const newRows = Array.from(rows);
    newRows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll('td')[index];
      const cellB = rowB.querySelectorAll('td')[index];
      const a = transform(index, cellA);
      const b = transform(index, cellB);
      if (a > b) {
        return 1 * multiplier;
      }
      if (a < b) {
        return -1 * multiplier;
      }
      if (a === b) {
        return 0;
      }
    });
    directions[index] = direction === 'desc' ? 'asc' : 'desc';
    rows.forEach((row) => {
      tableBody.removeChild(row);
    });
    newRows.forEach((newRow) => {
      tableBody.appendChild(newRow);
    });
  }

  const headerSearchInput = document.querySelector('.header-search__input');
  const headerLogo = document.querySelector('.header__logo');
  const headerWrapper = document.querySelector('.header__wrapper');
  headerLogo.addEventListener('click', () => {
    headerSearchInput.classList.toggle('is-active');
    headerWrapper.classList.toggle('is-active');
  });

  const headerSearchResult = document.querySelector('.header-search-result');
  let searchResultTimer;
  headerSearchInput.addEventListener('input', (e) => {
    clearTimeout(searchResultTimer);
    headerSearchResult.classList.remove('is-active');
    headerSearchResult.innerHTML = '';
    e.preventDefault();
    if (headerSearchInput.value) {
      searchResultTimer = setTimeout(() => {
        searchAutoFill(headerSearchInput.value).then((response) => {
          const data = response;
          if (data.length > 0) {
            headerSearchResult.classList.add('is-active');
            for (const contact of data) {
              const headerSearchResultLink = document.createElement('button');
              headerSearchResultLink.classList.add(
                'header-search-result__link'
              );
              headerSearchResult.append(headerSearchResultLink);
              headerSearchResultLink.textContent = `${contact.surname} ${contact.name} ${contact.middlename} `;
              headerSearchResultLink.addEventListener('click', () => {
                const rows = tableBody.querySelectorAll('tr');
                const newRows = Array.from(rows);

                newRows.forEach((row) => {
                  row.classList.remove('sublight');
                  if (row.getAttribute('data-tr') == contact.id) {
                    row.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                    row.classList.add('sublight');
                    headerSearchResult.classList.remove('is-active');
                  }
                });
              });
              window.addEventListener('click', (e) => {
                if (e.target !== headerSearchResult) {
                  headerSearchInput.value = '';
                  headerSearchResult.classList.remove('is-active');
                }
              });
            }
          }
        });
      }, 300);
    }
  });

  async function createClient(name, surname, middlename, contacts) {
    const respone = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        surname: surname,
        name: name,
        middlename: middlename,
        contacts,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await respone.json();
    return {
      data,
      status: respone.status,
    };
  }

  async function changeClient(id, name, surname, middlename, contacts) {
    const respone = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        surname: surname,
        name: name,
        middlename: middlename,
        contacts,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await respone.json();
    return {
      data,
      status: respone.status,
    };
  }

  async function deleteClient(id) {
    const data = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    });
    return {
      status: data.status,
    };
  }

  async function fetchClients() {
    const respone = await fetch('http://localhost:3000/api/clients');
    const data = await respone.json();
    return {
      data,
      status: respone.status,
    };
  }

  async function searchClientsId(id) {
    const respone = await fetch(`http://localhost:3000/api/clients/${id}`);
    const data = await respone.json();
    return {
      data,
      status: respone.status,
    };
  }

  async function searchAutoFill(sign) {
    const response = await fetch(
      `http://localhost:3000/api/clients?search=${sign}`
    );
    const data = await response.json();
    return data;
  }
})();
