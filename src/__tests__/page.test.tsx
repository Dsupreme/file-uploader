import "@testing-library/jest-dom";
import { act, render, findByTestId, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import Page from "../app/upload/page";
import { mockFetch } from "../mocks/mocks.fetch";

describe("Page Interface", () => {
  it("should render an input field, upload button", async () => {
    act(() => {
      window.fetch = mockFetch({ uploads: [] });
    });

    const { container } = render(<Page />);

    const inputEle = await findByTestId(container, "file-input");
    expect(inputEle).toBeInTheDocument();
  });
});

// describe("Page Upload Section", () => {
//   it("should upload image/file popup is open or not by clicking on the Select file button", async () => {});
// });

describe("Page File Validations Section", () => {
  it("should render an error message if file size > 5 MB", async () => {
    act(() => {
      window.fetch = mockFetch({ data: { uploads: [] } });
    });

    const { container, getByTestId } = render(<Page />);
    const str = "some random string";
    const blob = new Blob([str]);
    const file = new File([blob], "values.json", {
      type: "application/JSON",
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(str);

    const input = getByTestId("file-input");
    await user.upload(input, file);
    const inputEle = await findByTestId(container, "file-input");
    // console.log(inputEle);
    const errMsg = await findByTestId(container, "error-message");
    await waitFor(() => expect(errMsg).toBeInTheDocument());
  });
});
