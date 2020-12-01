package org.regitiny.duchoashop.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.regitiny.duchoashop.web.rest.TestUtil;

public class ProductmanagerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Productmanager.class);
        Productmanager productmanager1 = new Productmanager();
        productmanager1.setId(1L);
        Productmanager productmanager2 = new Productmanager();
        productmanager2.setId(productmanager1.getId());
        assertThat(productmanager1).isEqualTo(productmanager2);
        productmanager2.setId(2L);
        assertThat(productmanager1).isNotEqualTo(productmanager2);
        productmanager1.setId(null);
        assertThat(productmanager1).isNotEqualTo(productmanager2);
    }
}
