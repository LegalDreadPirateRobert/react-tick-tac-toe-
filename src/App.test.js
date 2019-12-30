import React from "react"
import App from "./App"
import { mount } from "./enzyme"
let wrapped;
beforeEach(()=>{
    console.log(mount)
    wrapped = mount(<App />);
})
afterEach(()=>{
    wrapped.unmount();
})

it("Check if button was rendered",()=>{
    console.log(true);
    expect(wrapped.find("button").length).toEqual(4);
})
it("what popaing",()=>{
    console.log("true");
    // expect(wrapped.find("button").length).toEqual(1);
})
