import React from "react";
import { shallow } from "enzyme";
import Game from "../src/components/Game";

describe("Game component render test", () => {
  test("Game component consumes the wasm module and renders the game of life", () => {
    const wrapper = shallow(<Game />);
    expect(wrapper).toMatchSnapshot();
  });
});
