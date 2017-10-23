import React from 'react';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import App from '../App';
import { shallow, mount } from 'enzyme';
import * as BookRepository from '../../BookRepository';
import allBooksResponse from './allbooks.json';
import BookModel from '../../model/BookModel';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'

jest.mock('../../BookRepository');

beforeEach(() => {
  BookRepository.getAllBooks = jest.fn(() =>
    Promise.resolve([].concat(...allBooksResponse).map(book => new BookModel(book))));
});

it('renders without crashing', () => {
  const tree = renderer.create(<Router><App /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
