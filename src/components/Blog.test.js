import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import {CreateBlog}  from './Forms'
import { act } from 'react-dom/test-utils'

describe('testing blog', () =>{
	test('render components', () => {
		const blog = {
			title: "a random title",
			author: "a random author",
			url: "http://arandomurl",
			likes: 2,
			user: {
				name: "a random guy"
			}
		}
	
		const component = render(
			<Blog blog={blog} user ={{name: 'aaa'}}/>
		)
		
		let basicInfo = component.container.querySelector('.blog')
	
		expect(basicInfo).toHaveTextContent('a random title')
		expect(basicInfo).toHaveTextContent('a random author')
		expect(component.container.querySelector('.extraInfo')).toHaveStyle('display: none')
	})
	
	test('extra info is shown when clicking view button', () => {
		const blog = {
			title: "a random title",
			author: "a random author",
			url: "http://arandomurl",
			likes: 2,
			user: {
				name: "a random guy"
			}
		}
	
		const component = render(
			<Blog blog={blog} user ={{name: 'aaa'}} />
		)
		
		const button = component.getByText('view')
		fireEvent.click(button)
	
		expect(component.container.querySelector('.extraInfo')).not.toHaveStyle('display: none')
	})
	
	test('func that increases likes is called twice when clicked twice', () => {
		const blog = {
			title: "a random title",
			author: "a random author",
			url: "http://arandomurl",
			likes: 2,
			user: {
				name: "a random guy"
			}
		}
	
		const mockHandler = jest.fn()
	
		const component = render(
			<Blog blog={blog} user ={{name: 'aaa'}} modifyBlog ={mockHandler}/>
		)
		
		const viewButton = component.getByText('view')
		fireEvent.click(viewButton)
	
		const likeButton = component.getByText('like')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)
	
		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})

describe('testing blog form', () =>{
	test('blog form receives right content', async () =>{
		const createBlog = jest.fn()
		
		let component = render(
			<CreateBlog createBlog={createBlog} />
		)
		
		const form = component.container.querySelector('form')
		const title = component.container.querySelector('#title')
		const author = component.container.querySelector('#author')
		const url = component.container.querySelector('#url')

		await act(async() =>{
			fireEvent.change(title, { 
				target: { value: 'test title' } 
			})
		})
		await act(async() =>{
			fireEvent.change(author, { 
				target: { value: 'test author' } 
			})
		})
		await act(async() =>{
			fireEvent.change(url, { 
				target: { value: 'test url' } 
			})
		})
		await act(async() =>{
			fireEvent.submit(form)
		})

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls).toContainEqual([{ title: 'test title', author: 'test author', url: 'test url' }])
	})
})