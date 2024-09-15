<script>
  document.addEventListener('DOMContentLoaded', () => {
    const mainTabItems = document.querySelectorAll('.main-tab-item');
    const mainTabContentItems = document.querySelectorAll('.main-tab-content-item');

    // Function to activate the correct main tab and content
    function selectMainTabItem() {
      // Remove 'main-tab-border' from all main tabs
      mainTabItems.forEach(item => {
        item.classList.remove('main-tab-border');
      });

      // Hide all main content items
      mainTabContentItems.forEach(item => {
        item.classList.remove('show');
      });

      // Add 'main-tab-border' to the clicked main tab
      this.classList.add('main-tab-border');

      // Show the corresponding main tab content
      const contentId = `${this.id}-content`;
      document.getElementById(contentId).classList.add('show');
    }

    // Attach click event listeners to main tabs
    mainTabItems.forEach(item => {
      item.addEventListener('click', selectMainTabItem);
    });

    // Nested tab logic for color blindness types
    const typeTabItems = document.querySelectorAll('.type-tab-item');
    const typeTabContentItems = document.querySelectorAll('.type-tab-content-item');

    // Function to activate the correct nested tab and content
    function selectTypeTabItem() {
      // Remove 'type-tab-border' from all nested tabs
      typeTabItems.forEach(item => {
        item.classList.remove('type-tab-border');
      });

      // Hide all nested content items
      typeTabContentItems.forEach(item => {
        item.classList.remove('show');
      });

      // Add 'type-tab-border' to the clicked nested tab
      this.classList.add('type-tab-border');

      // Show the corresponding nested tab content
      const contentId = `${this.id}-content`;
      document.getElementById(contentId).classList.add('show');
    }

    // Attach click event listeners to nested tabs
    typeTabItems.forEach(item => {
      item.addEventListener('click', selectTypeTabItem);
    });
  });
</script>
